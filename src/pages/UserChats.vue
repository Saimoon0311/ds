<!-- Chat.vue -->
<!-- <template>
  <div>
    <div v-if="this.userFirst.type == 'client'">
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
    <div v-if="userFirst && userFirst.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="userFirst && userFirst.type == 'lawyer'">
      <LawyerHeader />
    </div>

    <div class="container my-4">
      <div class="row">
        <h1 class="mainHeading">Chat Screen</h1>
        <!-- Client View: Select Lawyer -->
        <div v-if="userFirst.type === 'client' && lawyer_data.length > 0"
          :class="{ 'col-md-3': userFirst.type === 'client' }">
          <h2>Select Lawyer to Chat</h2>
          <ul class="lawyer-list">
            <li @click="startChatForClient(data, index)" v-for="(data, index) in lawyer_data" :key="data.id">
              <span class="lawyer-name">
                {{ data?.lawyer?.first_name }} {{ data?.lawyer?.last_name }}
              </span>
              <span v-if="data?.client_seen == 0 ||
                data?.client_seen == false ||
                data?.client_seen == null" class="badge bg-success mx-4">New Message</span>
              <span v-else></span>
            </li>
          </ul>
        </div>

        <!-- client chat box -->
        <div
          v-if="this.userFirst?.type == 'client' && this.lawyerSelected && chatStatus && jobId && userFirst && userSecond"
          :class="{ 'col-md-9': userFirst.type === 'client', 'chatbox': true }">
          <div class="text-right my-4">
            <span
              v-if="userFirst.type === 'client' && chatStatus && jobId && userFirst && userSecond && messages.length > 0"
              class="close-button">
              <button class="btn btn-danger" @click="closeChatForClient">x</button>
            </span>
          </div>
          <div v-if="messages.length > 0" class="chat-messages">
            <div v-for="message in messages" :key="message.id" class="message">
              <div :class="{ 'own-message': message.sender_email !== loginUserEmail }">
                <small class="lawyer-name">{{ message.sender_name }}:</small> <small>{{
                  humanReadableDate(message?.timestamp) }}</small>
                <div>
                  <strong>{{ message.text }}</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <input v-model="newMessage" placeholder="Type your message..." />
            <button @click="sendMessage">Send</button>
          </div>
        </div>
        <!-- client chat box end -->


        <!-- lawyer chat box -->
        <span v-if="this.userFirst?.type == 'lawyer'">
          <div v-if="chatStatus && jobId && userFirst && userSecond" class="chatbox">
            <div class="text-right my-4">
            </div>
            <div v-if="messages.length > 0" class="chat-messages">
              <div v-for="message in messages" :key="message.id" class="message">
                <div :class="{ 'own-message': message.sender_email !== loginUserEmail }">
                  <small class="lawyer-name">{{ message.sender_name }}:</small> <small>{{
                    humanReadableDate(message?.timestamp) }}</small>
                  <div>
                    <strong>{{ message.text }}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="chat-input">
              <input v-model="newMessage" placeholder="Type your message..." />
              <button @click="sendMessage">Send</button>
            </div>
          </div>
        </span>
        <!-- lawyer chat box end -->


      </div>
    </div>

    <div class="footer">

      <MainFooter />
    </div>
  </section>
</template>
  
<script>

import MainFooter from "../components/global/MainFooter.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";

import api from "@/config/api";
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
// import { FieldValue } from 'firebase/firestore';
import db from '@/config/firebaseConfig';

export default {

  components: {
    MainFooter,
    ClientHeader,
    LawyerHeader

  },

  data() {
    return {
      lawyerSelected: false,
      chatId: null,
      chats: null,
      chat: null,
      newMessage: '',
      messages: [],
      lawyer_data: [],
    };
  },

  computed: {
    lawyerEligibleStatus() {
      return this.$store.state.lawyerEligibleStatus;
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
    // this.createChatGroup('ham@ham.com','zafar@zafar.com');

    if (this.userFirst?.type == "client") {
      api.get(`/client/get-lawyers-list-to-chat/${this.jobId}`).then((res) => {
        this.lawyer_data = res?.data;
        console.log(this.lawyer_data);
      })
    } else {
      this.loadMessages();
    }
  },
  methods: {

    humanReadableDate(timestamp) {
      if (timestamp) {
        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          // timeZoneName: 'short',
        };

        return date.toLocaleString('en-US', options);
      }
    },

    startChatForClient(data, index) {
      this.lawyerSelected = true;
      this.$store.commit('SET_CHATSTATUS', 'old');
      this.$store.commit('SET_USERTOCHAT', data?.lawyer);
      this.chatId = data?.chat_id;
      this.loadMessages();
      if (!data?.client_seen) {
        this.clientSeenStatusUpdate(data, index);
      }
    },

    closeChatForClient() {
      this.$store.commit('SET_CHATSTATUS', null);
      this.$store.commit('SET_USERTOCHAT', null);
      this.chatId = null;
      this.messages = [];
    },

    clientSeenStatusUpdate(data, index) {
      api.post('/update-seen-status', { "id": data?.id , "status" : true}).then(() => {
        this.lawyer_data[index].client_seen = 1;
      });
    },

    loadMessages() {
      if (this.chatId == null) {
        this.chatId = (this.userFirst?.type == "lawyer") ? `${this.userFirst?.email}_${this.userSecond?.email}` : `${this.userSecond?.email}_${this.userFirst?.email}`;
      }
      const messagesRef = collection(db, 'chats', this.chatId, 'messages');

      onSnapshot(messagesRef, (snapshot) => {
        this.messages = snapshot.docs.map(doc => doc.data()).sort((a, b) => a.timestamp - b.timestamp);
      });
    },
    sendMessage() {
      if (this.newMessage == "" || this.newMessage == null) {
        return false;
      }

      console.log(this.chatStatus);
        console.log(this.userFirst?.type);
        console.log(this.lawyerEligibleStatus);

      if(this.chatStatus != "new" 
      && this.userFirst?.type == "lawyer" 
      && !this.lawyerEligibleStatus){
        return false;
      }

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
          api.post('/save-chat-info', { "lawyer_id": lawyer_id, "client_id": client_id, "job_id": this.jobId, "chat_id": this.chatId }).then(() => {
            this.$store.commit('SET_CHATSTATUS', 'old');
          })
        }
        if (this.chatStatus != "new" && this.userFirst?.type == "lawyer") {
          api.post('/update-seen-status', { "id": this.chatId , "status" : false});
        }
        let replyStatus = false;
        if(this.userFirst?.type == "client") {
          replyStatus = true;
        }
        api.post('/update-reply-status', { "id": this.chatId , "status" : replyStatus});

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
.chatbox {
  padding: 20px 20px;
  border: 1px solid rgb(220, 212, 212);
  border-radius: 10px;
}

.mainHeading {
  text-align: center;
  text-decoration: underline;
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

  text-align: right;
  margin-left: 10px;

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
</style>