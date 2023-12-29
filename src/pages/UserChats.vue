<!-- Chat.vue -->
<!-- <template>
  <div>
    <div v-if="this.userFirst?.type == 'client'">
      <div v-if="this.lawyer_data.length > 0">
        <h2>Select Lawyer to chat</h2>
        <ul>
          <li @click="startChatForClient(data)" v-for="data in this.lawyer_data" :key="data.id">
            {{ data?.lawyer?.first_name }} {{ data?.lawyer?.last_name }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="chatStatus && jobId && userFirst && userSecond">
      <div v-if="messages.length > 0">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.sender_email == loginUserEmail" style="color:brown !important">
            <strong>{{ message.sender_name }}:</strong> {{ message.text }}
          </div>
          <div v-else>
            <strong>{{ message.sender_name }}:</strong> {{ message.text }}
          </div>
        </div>
      </div>
      <input v-model="newMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
      <button v-if="userFirst?.type == 'client'" @click="closeChatForClient" >Close Chat</button>
    </div>
  </div>
</template> -->

<template>
  <section class="chatSection">
    <div v-if="userFirst && userFirst?.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="userFirst && userFirst?.type == 'lawyer'">
      <LawyerHeader />
    </div>

    <div class="container mx-4 mb  mx-auto">
      <router-link
        v-if="userFirst?.type == 'lawyer'"
        class="btn btn-dark btn-sm my-3"
        :to="{ path: '/lawyer-dashboard' }"
        ><i class="bi bi-arrow-left"></i> Back</router-link
      >
      <router-link
        v-else-if="userFirst?.type == 'client'"
        class="btn btn-dark btn-sm my-3"
        :to="{ path: '/client-dashboard' }"
        ><i class="bi bi-arrow-left"></i> Back</router-link
      >

      <div class="row">
        <div class="col-6 offset-5 ">
          <button
            @click="submitProposal(jobData)"
            v-if="
              userFirst && userFirst?.type == 'lawyer' && jobTabName != 'close'
            "
            class="btn btn-dark btn-md card-btn my-1 mx-1 border mb-3"
          >
            Submit a Proposal Now
          </button>
        </div>
      </div>
     
      <div class="row">
        <h2 class="mainHeading">Messages</h2>
        <!-- Client View: Select Lawyer -->

        <!-- lawyer names start -->
        <div
          v-if="userFirst?.type === 'client' && lawyer_data.length > 0"
          :class="{ 'col-md-3 p-2 rounded border': userFirst?.type === 'client' }"
        >
          <h4 class="d-block bg-dark text-white text-center py-2 rounded"> Lawyer</h4>
          <ul class="lawyer-list">
            <li
              @click="startChatForClient(data, index)"
              v-for="(data, index) in lawyer_data"
              :key="data.id"
              :class="['bg-light', { 'active': (index == userSelectedIndex) ? true : false }]"
            >
              <span class="lawyer-name">
                {{ data?.lawyer?.first_name }} {{ data?.lawyer?.last_name }}
              </span>
              <span
                v-if="
                  data?.client_seen == 0 ||
                  data?.client_seen == false ||
                  data?.client_seen == null
                "
                class="badge bg-dark mx-1"
                >New Message</span
              >
              <span v-else></span>
            </li>
          </ul>
        </div>
        <!-- lawyer names end -->

        <!-- client chat box -->
        <div
          v-if="
            this.userFirst?.type == 'client' &&
            this.lawyerSelected &&
            chatStatus &&
            jobId &&
            userFirst &&
            userSecond
          "
          :class="{ 'col-md-9': userFirst?.type === 'client', chatbox: true }"
        >
      

          <JobHeader :jobData="jobData" />
      

          <!-- <div class="text-end mb-3">
            <span
              v-if="
                userFirst?.type === 'client' &&
                chatStatus &&
                jobId &&
                userFirst &&
                userSecond &&
                messages.length > 0
              "
              class="close-button"
            >
              <button class="btn btn-danger" @click="closeChatForClient">
                x
              </button>
            </span>
          </div> -->
          <div v-if="messages.length > 0" class="chat-messages">
            <div v-for="message in messages" :key="message.id" class="message">
              <div
                :class="{
                  'own-message ': message.sender_email !== loginUserEmail,
                  'against-msg': message.sender_email == loginUserEmail,
                }"
              >
                <div class="text">
                  <small class="lawyer-name">{{ message.sender_name }}:</small>
                  <small>{{ humanReadableDate(message?.timestamp) }}</small>
                  <div>
                    {{ message.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input" v-if="jobTabName != 'close'">
            <input
              v-model="newMessage"
              placeholder="Type your message..."
              @input="checkInput"
            />
            <button
              @click="sendMessage"
              class="bg-dark text-white"
              :disabled="this.showTypeError"
            >
              Send
            </button>
          </div>
          <div v-if="showTypeError" class="alert alert-danger" role="alert">
            Please do not disclose personal details in the messaging system.
            Contact details will be exchanged when a client accepts a lawyer's
            proposal.
          </div>
        </div>
        <!-- client chat box end -->





        <!-- client chat box 2 start-->
        <div
          v-if="
            this.userFirst?.type == 'client'
            && this.checkClientComeFromProposal
          "
          :class="{ 'col-md-9': false, chatbox: true }"
        >
      

          <JobHeader :jobData="jobData" />
      

          <div class="text-end mb-3">
            <span
              v-if="
                userFirst?.type === 'client' &&
                chatStatus &&
                jobId &&
                userFirst &&
                userSecond &&
                messages.length > 0
              "
              class="close-button"
            >
              <button class="btn btn-danger" @click="closeChatForClient">
                x
              </button>
            </span>
          </div>
          <div v-if="messages.length > 0" class="chat-messages">
            <div v-for="message in messages" :key="message.id" class="message">
              <div
                :class="{
                  'own-message ': message.sender_email !== loginUserEmail,
                  'against-msg': message.sender_email == loginUserEmail,
                }"
              >
                <div class="text">
                  <small class="lawyer-name">{{ message.sender_name }}:</small>
                  <small>{{ humanReadableDate(message?.timestamp) }}</small>
                  <div>
                    {{ message.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input" v-if="jobTabName != 'close'">
            <input
              v-model="newMessage"
              placeholder="Type your message..."
              @input="checkInput"
            />
            <button
              @click="sendMessage"
              class="bg-dark text-white"
              :disabled="this.showTypeError"
            >
              Send
            </button>
          </div>
          <div v-if="showTypeError" class="alert alert-danger" role="alert">
            Please do not disclose personal details in the messaging system.
            Contact details will be exchanged when a client accepts a lawyer's
            proposal.
          </div>
        </div>
        <!-- client chat box 2 end -->





        <!-- lawyer chat box -->
        <span v-if="this.userFirst?.type == 'lawyer'">
          <div class="row lawyer">
            
            <div
              v-if="chatStatus && jobId && userFirst && userSecond"
              class="chatbox col-md-9 m-auto"
            >
          <JobHeader :jobData="jobData" />

              <div
                v-if="chatStatus == 'new'"
                class="alert alert-danger"
                role="alert"
              >
                You can send one message to the client if you need more
                information about the job in order to submit a proposal. if
                client reply you so you are free to chat with client.
              </div>

              <div class="text-right my-4"></div>
              <div v-if="messages.length > 0" class="chat-messages">
                <div
                  v-for="message in messages"
                  :key="message.id"
                  class="message"
                >
                  <div
                    :class="{
                      'own-message': message.sender_email !== loginUserEmail,
                      'against-msg': message.sender_email == loginUserEmail,
                    }"
                  >
                    <div class="text">
                      <small class="lawyer-name"
                        >{{ message.sender_name }}:</small
                      >
                      <small>{{ humanReadableDate(message?.timestamp) }}</small>
                      <div>
                        {{ message.text }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chat-input" v-if="jobTabName != 'close'">
                <input
                  v-model="newMessage"
                  placeholder="Type your message..."
                  @input="checkInput"
                />
                <button
                  @click="sendMessage"
                  class="bg-dark text-white"
                  :disabled="this.showTypeError"
                >
                  Send
                </button>
              </div>
              <div v-if="showTypeError" class="alert alert-danger" role="alert">
                Please do not disclose personal details in the messaging system.
                Contact details will be exchanged when a client accepts a
                lawyer's proposal.
              </div>
            </div>
          </div>
        </span>
        <!-- lawyer chat box end -->
      </div>
    </div>

    <div class="footer ">
      <MainFooter />
    </div>
  </section>
</template>

<script>
import MainFooter from "../components/global/MainFooter.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";

// import ShowJobDetails from "../components/ShowJobDetails";
import JobHeader from "../components/JobHeader";

import api2 from "@/config/api";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
// import { FieldValue } from 'firebase/firestore';
import { db } from "@/config/firebaseConfig";

export default {
  components: {
    MainFooter,
    ClientHeader,
    LawyerHeader,
    JobHeader,
    // ShowJobDetails
  },

  data() {
    return {
      userSelectedIndex : null,
      lawyerSelected: false,
      chatId: null,
      chats: null,
      chat: null,
      newMessage: "",
      messages: [],
      lawyer_data: [],
      client_data: [],
      showTypeError: false,
      is_client_reply: false,
    };
  },

  computed: {
    jobData() {
      // console.log('job data : ' , this.$store.state.jobData);
      return this.$store.state.jobData;
    },

    // lawyerEligibleStatus() {
    //   return this.$store.state.lawyerEligibleStatus;
    // },
    jobTabName() {
      return this.$store.state.dataTab;
    },
    showAllMessages() {
      return this.$store.state.showAllMessages;
    },
    chatStatus() {
      return this.$store.state.chatStatus;
    },
    jobId() {
      return this.$store.state.jobIdToChat;
    },
    userFirst() {
      return this.$store.state.loginUser;
    },
    userSecond() {
      return this.$store.state.userToChat;
    },
    checkClientComeFromProposal(){
      return this.$store.state.clientComeFromProposal;
    }
  },

  beforeUnmount(){
    this.$store.commit("SET_CLIENTCOMEFROMPROPOSAL", false);
  },

  mounted() {
    // if (!this.userFirst) {
    //   this.$router.go(-1);
    // }

    if (this.userFirst?.type == "client") {
      if(!this.checkClientComeFromProposal){
        api2.get(`/client/get-lawyers-list-to-chat/${this.jobId}`).then((res) => {
        this.lawyer_data = res?.data;
        if(this.lawyer_data.length > 0){
          this.startChatForClient(this.lawyer_data[0], 0);
        }
        console.log(this.lawyer_data);
      });
      }else{
        this.loadMessages();
      }
      console.log('user second :' , this.userSecond);  
    } else {
      console.log("else mounte");
      // for lawyer
      this.loadMessages();
    }
  },
  methods: {
    //     indexOfNumber(inputString) {
    //   for (let i = 0; i < inputString.length; i++) {
    //     if (!isNaN(inputString[i])) {
    //       return i; // Return the index when the first number is found
    //     }
    //   }
    //   return -1; // Return -1 if no number is found in the string
    // },

    checkInput() {
      // Check if the input contains a continuous sequence of 8 numbers or @
      const numberSequenceRegex = /\d{8}/;
      this.showTypeError =
        numberSequenceRegex.test(this.newMessage) ||
        this.newMessage.includes("@");
    },

    submitProposal(item) {
      this.saveJobInfo(item);
      this.$router.push({ path: "/proposal" });
    },

    // humanReadableDate(timestamp) {
    //   if (timestamp) {
    //     const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
    //     const options = {
    //       weekday: 'short',
    //       month: 'short',
    //       day: 'numeric',
    //       year: 'numeric',
    //       hour: 'numeric',
    //       minute: '2-digit',
    //       // timeZoneName: 'short',
    //     };

    //     return date.toLocaleString('en-US', options);
    //   }
    // },

    humanReadableDate(timestamp) {
      if (timestamp) {
        const date = new Date(
          timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6
        );

        // Format the date
        const options = {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          // timeZone: 'Australia/Sydney',
        };

        const formattedDate = date.toLocaleString("en-AU", options);

        return formattedDate.replace(",", ""); // Remove the comma from the date
      }
    },

    startChatForClient(data, index) {
      this.userSelectedIndex = index;
      this.lawyerSelected = true;
      this.$store.commit("SET_CHATSTATUS", "old");
      this.$store.commit("SET_USERTOCHAT", data?.lawyer);
      this.chatId = data?.chat_id;
      this.loadMessages();
      if (!data?.client_seen) {
        this.clientSeenStatusUpdate(data, index);
      }
    },

    closeChatForClient() {
      this.$store.commit("SET_CHATSTATUS", null);
      this.$store.commit("SET_USERTOCHAT", null);
      this.chatId = null;
      this.messages = [];
    },

    clientSeenStatusUpdate(data, index) {
      api2
        .post("/update-seen-status", { id: data?.id, status: true })
        .then(() => {
          this.lawyer_data[index].client_seen = 1;
        });
    },

    loadMessages() {
      console.log("chat id 1::::: ", this.chatId);
      if (this.chatId == null) {
        this.chatId =
          this.userFirst?.type == "lawyer"
            ? `${this.userFirst?.email}_${this.userSecond?.email}`
            : `${this.userSecond?.email}_${this.userFirst?.email}`;
        
        this.chatId = `${this.chatId}_${this.jobId}`; 
      }

      console.log("chat id 2::::: ", this.chatId);
      const messagesRef = collection(db, "chats", this.chatId, "messages");
      console.log("chat id 3::::: ", messagesRef);
      onSnapshot(messagesRef, (snapshot) => {
        console.log("snap :::: ", snapshot);
        this.messages = snapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.timestamp - b.timestamp);
      });
      console.log("chat id 4::::: ", this.messages);
    },
    sendMessage() {
      console.log(addDoc);
      console.log(serverTimestamp);
      console.log(this.chatStatus);
      console.log(this.userFirst?.type);

      if (this.newMessage == "" || this.newMessage == null) {
        return false;
      }

      if (this.messages.length > 0 && this.userFirst?.type == "lawyer") {
        if (
          this.messages.length == 1 &&
          this.messages[0].sender_email == this.userFirst?.email
        ) {
          this.$swal(
            "",
            "You can not send message until client reply on your first messages, please wait for client reply",
            "error"
          );
          this.newMessage = "";
          return false;
        }
      }

      // console.log(this.chatStatus);
      // console.log(this.userFirst?.type);
      // console.log(this.lawyerEligibleStatus);

      // if(this.chatStatus != "new"
      // && this.userFirst?.type == "lawyer"
      // && !this.lawyerEligibleStatus){
      //   return false;
      // }

      // console.log(this.chatId);
      const messagesRef = collection(db, "chats", this.chatId, "messages");
      console.log(messagesRef);
      addDoc(messagesRef, {
        sender_name: `${this.userFirst?.first_name} ${this.userFirst?.last_name}`,
        sender_email: this.userFirst?.email,
        text: this.newMessage,
        timestamp: serverTimestamp(),
      })
        .then((docRef) => {
          console.log(this.userFirst);
          const lawyer_id =
            this.userFirst?.type == "lawyer"
              ? this.userFirst?.id
              : this.userSecond?.id;
          const client_id =
            this.userFirst?.type == "client"
              ? this.userFirst?.id
              : this.userSecond?.id;

          if (this.chatStatus == "new" && this.userFirst?.type == "lawyer") {
            api2
              .post("/save-chat-info", {
                lawyer_id: lawyer_id,
                client_id: client_id,
                job_id: this.jobId,
                chat_id: this.chatId,
              })
              .then(() => {
                this.$store.commit("SET_CHATSTATUS", "old");
              });
          }
          if (this.chatStatus != "new" && this.userFirst?.type == "lawyer") {
            api2.post("/update-seen-status", {
              id: this.chatId,
              status: false,
            });
          }
          // let replyStatus = false;
          // if(this.userFirst?.type == "client") {
          //   replyStatus = true;
          // }
          // api.post('/update-reply-status', { "id": this.chatId , "status" : replyStatus});

          console.log("Document written with ID:", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document:", error);
        });
      this.newMessage = "";
    },
  },
};
</script>

<style scoped>
.warning-alert {
  color: red;
  margin-top: 5px;
}

.chatbox {
  padding: 15px;
  border: 1px solid rgb(220, 212, 212);
  border-radius: 5px;
}

.mainHeading {
  text-align: center;
}

/* Add your custom styles here */
.lawyer-list {
  list-style: none;
  padding: 0;
}

.lawyer-list li {
  cursor: pointer;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.lawyer-list li:hover {
  background-color: #f0f0f0;
}

.chat-messages {
  margin-bottom: 20px;
}

.message {
  margin-bottom: 10px;
}

.own-message {
  /* color: brown !important; */

  /* text-align: right;
  margin-left: 10px; */
}

.chat-input {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #dddddd45;
}

.chat-input button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #0056b3;
}

.lawyer-name {
  text-transform: capitalize;
}

.chat-messages .message {
  width: 100%;
}

.chat-messages .message .own-message {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

.lawyer .chat-messages .message .own-message {
  justify-content: start;
}

.lawyer .chat-messages .message .against-msg {
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
}

.lawyer .chat-messages .message .against-msg.text {
  background: #ddd !important;
  color: black !important;
  text-align: start !important;
}

.chat-messages .message .against-msg {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.lawyer .chat-messages .message .own-message.text {
  background: black !important;
  color: white !important;
  text-align: end !important;
}

.chat-messages .message .own-message .text {
  width: fit-content;
  padding: 10px;
  background: #ddd;
  color: black;
  border-radius: 5px;
  text-align: end;
}

.chat-messages .message .against-msg .text {
  width: fit-content;
  padding: 10px;
  position: relative;
  border-radius: 5px;
  background: black;
  color: white;
}

.small,
small {
  font-size: 0.75rem;
}
.chat-messages .message .own-message .text {
  position: relative;
}
.chat-messages {
  min-height: 400px;
  overflow-y: scroll;
  height: 400px;
  padding-right: 10px;
  padding-left: 5px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(217, 217, 217, 1);
  border-radius: 10px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(217, 217, 217, 1);
  /* outline: 1px solid #292929; */
  border-radius: 10px;
}
.chat-messages .message .own-message .text:before {
  content: "";
  background: #dddddd;
  position: absolute;
  left: -3px;
  bottom: 3px;
  display: block;
  width: 10px;
  height: 3px;
  border-left: 2px solid #dddddd;
  border-right: 2px solid #dddddd;
  border-bottom: 10px solid #dddddd;
  transform: rotate(-45deg);
}
.chat-messages .message .against-msg .text:before {
  content: "";
  background: #000000;
  position: absolute;
  right: -3px;
  bottom: 3px;
  display: block;
  width: 10px;
  height: 3px;
  border-left: 2px solid #000000;
  border-right: 2px solid #000000;
  border-bottom: 10px solid #000000;
  transform: rotate(-45deg);
}
.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
}
section.chatSection{
  position: relative;
  min-height: 100vh;
}
@media screen and (max-width: 1600px) {
.mb{
  padding-bottom: 50px;
}
}
@media screen and (max-width: 768px) {

h4{
  font-size: 20px;
}
}
@media screen and (max-width: 767px) {
  .footer{
    position: relative;
  }
  .mb{
    padding-bottom: 10px;
  }
  .chatbox {
    width: 94%;
    margin: auto;
}
h4{
    font-size: 16px;
}
}
@media screen and (max-width: 350px) {
.chat-input{
  flex-wrap: wrap;
}
.chat-input button {
    width: -webkit-fill-available;

}
}
</style>
