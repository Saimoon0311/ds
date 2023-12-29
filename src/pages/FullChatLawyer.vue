<template>
  <section class="chatSection">
    <div>
      <LawyerHeader />
    </div>

    <div class="container mb my-4">


      <!-- <div class="row">

        <ShowJobDetails :jobData="jobData" />

      </div> -->

      <!-- <div class="row">
        <div class="col-6 offset-5">
          <button @click="submitProposal(jobData)" v-if="userFirst && userFirst?.type == 'lawyer' && jobTabName != 'close'"
            class="btn btn-dark btn-sm card-btn my-1 mx-1 border">
            Submit a Proposal Now
          </button>
        </div>
      </div> -->

      <div class="row">

        <h2 class="mainHeading">Messages</h2>
        
        <h4 v-if="client_data.length == 0" class="text-center">No chat found!</h4>

        <!-- client names start -->
        <div v-if="client_data.length > 0"
          :class="{ 'col-md-3': true}">
          <h4>Select {{ userFirst.type == 'lawyer' ? 'Client' : 'Lawyer' }} to Chat</h4>
          <!-- <input class="form-control mb-4" type="text" placeholder="Search Client..." /> -->
          <input  class="form-control mb-4" v-model="searchClient" @input="filterItems" placeholder="Search...">
          <ul class="lawyer-list" v-if="client_data2.length > 0">
            <li @click="startChatForAllMessages(data)" v-for="(data, index) in client_data2" :key="index"
              :class="['bg-light', { 'active': (data?.id == userSelectedIndex) ? true : false }]"
              >
              <span class="lawyer-name" data-toggle="tooltip" data-placement="right" :title="data?.job?.title">
                {{ data?.client?.first_name ?? data?.lawyer?.first_name }} {{ data?.client?.last_name ?? data?.lawyer?.last_name }} | Job No: {{ data?.job?.identity }}
              </span>
              <!-- <span v-if="data?.client_seen == 0 ||
                data?.client_seen == false ||
                data?.client_seen == null" class="badge bg-dark mx-1">New Message</span>
              <span v-else></span> -->
            </li>
          </ul> 
        </div>


        <!-- client names end -->


        <!-- all messages chat box -->
        <div v-if="this.clientSelected"
        :class="{ 'col-md-9': true, 'chatbox': true }"
        >
          <!-- <div class="text-end mb-3">
            <span
              class="close-button">
              <button class="btn btn-danger" @click="closeChatForAllMessages">x</button>
            </span>
          </div> -->

          <JobHeader :jobData="jobData" />

          <div class="row lawyer">
            <!-- <div v-if="chatStatus && jobId && userFirst && userSecond && jobTabName != 'close'" class="chatbox col-md-7 m-auto"> -->
              <!-- class="chatbox col-md-7 m-auto -->
              <div>
              <!-- <div v-if="chatStatus == 'new'" class="alert alert-danger" role="alert">
                You can send one message to the client if you need more information about the job in order to submit a
                proposal. if client reply you so you are free to chat with client.
              </div> -->

              
              <div class="text-right my-4">
              </div>
              <div v-if="messages.length > 0" class="chat-messages">
                <div v-for="message in messages" :key="message.id" class="message">
                  <div
                    :class="{ 'own-message': message.sender_email !== loginUserEmail, 'against-msg': message.sender_email == loginUserEmail }">
                    <div class="text">
                      <small class="lawyer-name">{{ message.sender_name }}:</small> <small>{{
                        humanReadableDate(message?.timestamp) }}</small>
                      <div>
                        <strong>{{ message.text }}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="chat-input" v-if="!hideInput">
                <input v-model="newMessage" placeholder="Type your message..." @input="checkInput" />
                <button @click="sendMessage" class="bg-dark text-white" :disabled="this.showTypeError">Send</button>
              </div>
              <div v-if="showTypeError" class="alert alert-danger" role="alert">
                Please do not disclose personal details in the messaging system. Contact details will be exchanged when a
                client
                accepts a lawyer's proposal.
              </div>
            </div>
          </div>
        </div>
        <!-- all messages chat box end -->





      </div>
    </div>

    <div class="footer">

      <MainFooter />
    </div>
  </section>
</template>
  
<script>

import JobHeader from "../components/JobHeader";
import MainFooter from "../components/global/MainFooter.vue";
// import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";


// import ShowJobDetails from "../components/ShowJobDetails";

import api2 from "@/config/api";
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
// import { FieldValue } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default {

  components: {
    JobHeader,
    MainFooter,
    // ClientHeader,
    LawyerHeader,
    // ShowJobDetails
  },

  data() {
    return {
      alreadyMessages : false,
      userSelectedIndex : null,
      userSelectedIndexBackup : null,
      searchClient: '',
      lawyerSelected: false,
      clientSelected: false,
      chatId: null,
      chats: null,
      chat: null,
      newMessage: '',
      messages: [],
      lawyer_data: [],
      client_data : [],
      client_data2 : [],
      showTypeError: false,
      is_client_reply: false,
      hideInput : false,
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
    jobTabName(){
      return this.$store.state.dataTab;
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
    }
  },

  mounted() {
        // show all messages
        api2.get('/get-all-users-of-jobs').then((res) => {
          this.client_data = res?.data;
          this.client_data2 = this.client_data;

          if(this.client_data2.length > 0){
            this.startChatForAllMessages(this.client_data2[0]);
          }

          console.log(' cleint data : ' , this.client_data);
        });
 
      this.loadMessages();
  },
  methods: {

    filterItems() {
      const query = this.searchClient.toLowerCase();
      console.log(query);
      console.log('item : ' , this.client_data);
      const arr = this.client_data.filter((item) => {
        const fullName = `${item?.client?.first_name ?? item?.lawyer?.first_name} ${item?.client?.last_name ?? item?.lawyer?.last_name}`.toLowerCase();
        console.log('filter name : ' , fullName);
        console.log('query name : ' , query);
        return fullName.includes(query);
      });
      this.client_data2 = arr;
    },


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
      this.showTypeError = numberSequenceRegex.test(this.newMessage) || this.newMessage.includes('@');
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
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

        // Format the date
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          // timeZone: 'Australia/Sydney', 
        };

        const formattedDate = date.toLocaleString('en-AU', options);

        return formattedDate.replace(',', ''); // Remove the comma from the date
      }
    },

    startChatForAllMessages(data) {
      const index = data?.id;
      this.$store.commit("SET_JOB_DATA", data?.job);
      console.log('hit 1')
      this.userSelectedIndex = index;
      this.clientSelected = true;
      this.$store.commit('SET_USERTOCHAT', data?.client);
      this.chatId = data?.chat_id;
      this.hideInput = data?.client?.is_closed;
      this.loadMessages();

      console.log('hit 2  : ' , this.userFirst?.type , this.showAllMessages , this.lawyerSelected)
    },

    closeChatForAllMessages() {
      this.clientSelected = false;
      this.$store.commit('SET_USERTOCHAT', null);
      this.chatId = null;
      this.messages = [];
    },




    clientSeenStatusUpdate(data, index) {
      api2.post('/update-seen-status', { "id": data?.id, "status": true }).then(() => {
        this.lawyer_data[index].client_seen = 1;
      });
    },

    loadMessages() {
      console.log('chat id 1::::: ' , this.chatId);
      if (this.chatId == null) {
        this.chatId = (this.userFirst?.type == "lawyer") ? `${this.userFirst?.email}_${this.userSecond?.email}` : `${this.userSecond?.email}_${this.userFirst?.email}`;
      }
      console.log('chat id 2::::: ' , this.chatId);
      const messagesRef = collection(db, 'chats', this.chatId, 'messages');
      console.log('chat id 3::::: ' , messagesRef);
      onSnapshot(messagesRef, (snapshot) => {
        console.log('snap :::: ' , snapshot);
        this.messages = snapshot.docs.map(doc => doc.data()).sort((a, b) => a.timestamp - b.timestamp);
      });
      console.log('chat id 4::::: ' , this.messages);
    },
    sendMessage() {
      console.log(addDoc);
      console.log(serverTimestamp);
      console.log(this.chatStatus);
      console.log(this.userFirst?.type);

      if (this.newMessage == "" || this.newMessage == null) {
        return false;
      }

      if (this.messages.length > 0 && this.userFirst?.type == 'lawyer') {
        if (
          this.messages.length == 1 &&
          this.messages[0].sender_email == this.userFirst?.email
        ) {
          this.$swal("", "You can not send message until client reply on your first messages, please wait for client reply", "error");
          this.newMessage = '';
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
      const messagesRef = collection(db, 'chats', this.chatId, 'messages');
      console.log(messagesRef);
      addDoc(messagesRef, {
        sender_name: `${this.userFirst?.first_name} ${this.userFirst?.last_name}`,
        sender_email: this.userFirst?.email,
        text: this.newMessage,
        timestamp: serverTimestamp(),
      }).then((docRef) => {
        console.log(this.userFirst);
        const lawyer_id = (this.userFirst?.type == "lawyer") ? this.userFirst?.id : this.userSecond?.id;
        const client_id = (this.userFirst?.type == "client") ? this.userFirst?.id : this.userSecond?.id;
        
        if (this.chatStatus == "new" && this.userFirst?.type == "lawyer") {
          api2.post('/save-chat-info', { "lawyer_id": lawyer_id, "client_id": client_id, "job_id": this.jobId, "chat_id": this.chatId }).then(() => {
            this.$store.commit('SET_CHATSTATUS', 'old');
          })
        }
        if (this.chatStatus != "new" && this.userFirst?.type == "lawyer") {
          api2.post('/update-seen-status', { "id": this.chatId, "status": false });
        }
        // let replyStatus = false;
        // if(this.userFirst?.type == "client") {
        //   replyStatus = true;
        // }
        // api.post('/update-reply-status', { "id": this.chatId , "status" : replyStatus});

        console.log('Document written with ID:', docRef.id);
      })
        .catch((error) => {
          console.error('Error adding document:', error);
        });
      this.newMessage = '';
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
  background-color: #007BFF;
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

  border-radius: 5px;
  background: black;
  color: white;
}

.small,
small {
  font-size: .75rem;
}

.chat-messages {
  min-height: 400px;
  overflow-y: scroll;
  height: 400px;
  padding-right: 10px;
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