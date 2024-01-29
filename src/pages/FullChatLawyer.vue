<template>
  <section class="chatSection">
    <div v-if="userFirst?.type == 'lawyer'">
      <LawyerHeader />
    </div>
    <div v-if="userFirst?.type == 'client'">
      <ClientHeader />
    </div>

    <div class="container mb mb-4 mt-3 main-container">


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

      <div class="row px-2">

        <h3 class="mainHeading mb-3">Messages</h3>

        <p v-if="client_data.length == 0" class="text-center">
          Here is where you'll find all the messages a {{ userFirst?.type == "lawyer" ? 'client' : 'lawyer' }}
          sends you or you send to a {{ userFirst?.type == "lawyer" ? 'client' : 'lawyer' }}. You currently have no
          messages.
        </p>

        <!-- client names start -->
        <div v-if="client_data.length > 0" :class="{ 'col-md-3 p-3 rounded border': true }">
          <h5 class="d-block bg-col text-white text-center py-2"> {{ userFirst?.type == 'lawyer' ? 'Client' :
            'Lawyer' }} </h5>
          <!-- <input class="form-control mb-4" type="text" placeholder="Search Client..." /> -->
          <input class="form-control mb-4" v-model="searchClient" @input="filterItems" placeholder="Search...">
          <ul class="lawyer-list" v-if="client_data2.length > 0">
            <li @click="startChatForAllMessages(data, true, index)" v-for="(data, index) in client_data2" :key="index"
              :class="['bg-light', { 'active': (data?.id == userSelectedIndex) ? true : false }]">
              <span class="lawyer-name" data-toggle="tooltip" data-placement="right" :title="data?.job?.title">
                {{ data?.client?.first_name ?? data?.lawyer?.first_name }}
                <span v-if="userFirst?.type == 'client' && data?.job?.assigned_lawyer_id == data?.lawyer_id">
                  {{ data?.client?.last_name ?? data?.lawyer?.last_name }}
                </span>
                <span v-if="userFirst?.type == 'lawyer' && data?.job?.assigned_lawyer_id == userFirst?.id">
                  {{ data?.client?.last_name ?? data?.lawyer?.last_name }}
                </span>
                | Job No: {{ data?.job?.identity }}
                <span v-if="data?.is_closed">
                  | Archived
                </span>

              </span>

              <span v-if="messages.length > 0 && data?.id !== userSelectedIndex">
                <span v-if="loginUser?.type == 'client' && (data?.client_seen == 0 ||
                  data?.client_seen == false ||
                  data?.client_seen == null)" class="badge bg-dark mx-1">New Message</span>

                <span v-if="loginUser?.type == 'lawyer' && (data?.lawyer_seen == 0 ||
                  data?.lawyer_seen == false ||
                  data?.lawyer_seen == null)" class="badge bg-dark mx-1">New Message</span>
              </span>

            </li>
          </ul>
        </div>


        <!-- client names end -->


        <!-- all messages chat box -->
        <div v-if="this.clientSelected" :class="{ 'col-md-9 p-0 border-0': true }">
          <!-- <div class="text-end mb-3">
            <span
              class="close-button">
              <button class="btn btn-danger" @click="closeChatForAllMessages">x</button>
            </span>
          </div> -->
          <div class="chatbox ms-2">

            <!-- <JobHeader :jobData="jobData" /> -->
            <JobHeader :jobData="jobData" />

            <div class="row lawyer">
              <!-- <div v-if="chatStatus && jobId && userFirst && userSecond && jobTabName != 'close'" class="chatbox col-md-7 m-auto"> -->
              <!-- class="chatbox col-md-7 m-auto -->
              <div>
                <div v-if="chatStatus == 'new' && userFirst?.type == 'lawyer'" class="alert alert-danger" role="alert">
                  You can only send one message to the client if you need more information about the job in order to
                  submit a proposal. If they respond to your message however, you will be able to communicate freely.
                </div>


                <div class="text-right my-4">
                </div>
                <div v-if="messages.length > 0" class="chat-messages" ref="msgbox">
                  <div v-for="message in messages" :key="message.id" class="message">
                    <div
                      :class="{ 'own-message': message.sender_email !== loginUserEmail, 'against-msg': message.sender_email == loginUserEmail }">
                      <div class="text">
                        <small class="lawyer-name">{{ message.sender_name }} : </small> <small>{{
                          humanReadableDate(message?.timestamp) }}</small>
                        <div>
                          {{ message.text }}
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
                  Please do not disclose personal details in the messaging system. Contact details will be exchanged when
                  a
                  client
                  accepts a lawyer's proposal.
                </div>
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
import ClientHeader from "../pages/client/Header.vue";


// import ShowJobDetails from "../components/ShowJobDetails";

import api2 from "@/config/api2";
import { collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
// import { FieldValue } from 'firebase/firestore';
import { db } from '@/config/firebaseConfig';

export default {

  components: {
    JobHeader,
    MainFooter,
    // ClientHeader,
    LawyerHeader,
    ClientHeader,
    // ShowJobDetails
  },

  data() {
    return {
      alreadyMessages: false,
      userSelectedIndex: null,
      userSelectedIndexBackup: null,
      searchClient: '',
      lawyerSelected: false,
      clientSelected: false,
      lawyerMessageExist: false,
      chatId: null,
      chats: null,
      chat: null,
      newMessage: '',
      messages: [],
      lawyer_data: [],
      client_data: [],
      client_data2: [],
      showTypeError: false,
      is_client_reply: false,
      hideInput: false,
      myJobData: null,
    };
  },

  created() {
    console.log('job data on chat page : ', this.jobTabName);
    console.log('job data on chat page 2 : ', 'abc');
    if (!this.isNotHeaderChatComputed && this.jobTabName) {
      this.$store.commit('SET_DATATAB', null);
    }
    this.resetCount('message');
  },

  beforeUnmount() {
    this.$store.commit("SET_IS_NOT_HEADER_CHAT", null);
  },

  mounted() {
    this.scrollToBottom();
    console.log('f check start')
    console.log('userFirst : ', this.userFirst);
    console.log('userSecond : ', this.userSecond);
    console.log('jobId : ', this.jobId);
    console.log('jobData : ', this.jobData);
    console.log('chatStatus : ', this.chatStatus);
    console.log('chatId : ', this.chatId);
    console.log('f check end')

    this.fetchChatMembers();
    console.log('load run run run')
    this.loadMessages(true);
  },


  watch: {
    // Watch for changes in the 'noti' property in the Vuex store
    '$store.state.noti': {
      handler(newValue) {
        if (newValue) {
          // Handle the changes, for example, display a notification
          console.log('noti changed 2 3 4 5 6 7:', newValue);
          console.log('data : ', this.client_data);
          console.log('data 2 : ', this.client_data2);
          // this.$swal(newValue?.notification?.title, newValue?.notification?.body, 'success');

          // if lawyer message exist in chat and recieve message from client as a replay
          if (this.userFirst?.type == 'lawyer') {
            const noti = JSON.parse(newValue?.data?.payload);
            console.log(noti?.sender_id);
            const userFirstMessageExist = this.messages.some(msg => msg.sender_email === this.userFirst?.email);
            if (userFirstMessageExist && noti?.sender_id == this.userSecond?.id) {
              this.$store.commit("SET_CHATSTATUS", "old");
            }
          }


          // this.moveObjectToTop(this.client_data2, noti?.chat_id)
          // console.log(this.client_data2);
          console.log('sel index before load : ', this.userSelectedIndex);
          this.fetchChatMembers(false);


        }
      },
      immediate: true, // Trigger the handler immediately when the component is created
    },
  },


  computed: {
    isNotHeaderChatComputed() {
      return this.$store.state.isNotHeaderChat;
    },
    noti_msg() {
      console.log('pay payp pya 1: ', this.$store.state.noti_count_msg);
      return this.$store.state.noti_count_msg;
    },
    notificationPayload() {
      console.log('pay payp pya 2: ', this.$store.state.noti);
      return this.$store.state.noti;
    },
    // lawyerEligibleStatus() {
    //   return this.$store.state.lawyerEligibleStatus;
    // },
    jobTabName() {
      return this.$store.state.dataTab;
    },
    chatStatus() {
      return this.$store.state.chatStatus;
    },
    jobId() {
      // console.log('job data 1 : ' , this.$store.state.jobIdToChat);
      return this.$store.state.jobIdToChat;
    },
    userFirst() {
      return this.$store.state.loginUser;
    },
    userSecond() {
      return this.$store.state.userToChat;
    },
    jobData() {
      console.log('job data 2 2 2 : ', this.$store.state.jobData);
      return this.$store.state.jobData;
    },
  },

  updated() {
    // Scroll to the bottom when the component is updated (e.g., when new messages are added)
    this.scrollToBottom();
  },

  methods: {

    fetchChatMembers(startChat = true) {
      const job = this.$route.query.job;
      let endpoint = (typeof job === "undefined") ? '/get-all-users-of-jobs' : `/get-all-users-of-jobs/${job}`;
      // show all messages
      api2.get(endpoint).then((res) => {

        this.client_data = res?.data?.users;
        this.client_data2 = this.client_data;

        let index = 0;
        if (this.client_data2.length > 0) {
          console.log('maaz : ', res?.data?.job);
          if (res?.data?.job != null) {
            this.myJobData = res?.data?.job;
            console.log('check state job data 101: ', res?.data);
            console.log('check state job data 102: ', this.client_data2);
            console.log('check state job data 103: ', this.client_data2.findIndex(job => job.job_id === res?.data?.job.id));
            index = this.client_data2.findIndex(job => job.job_id === res?.data?.job.id);
            console.log('maaz 10 : ', index)
            // add object for new chats
            if (index == -1) {
              let obj = {
                job: res?.data?.job,
                client_seen: 1
              }
              obj[this.userSecond?.type] = this.userSecond;
              // add user in user list with job id if chat is new
              this.client_data2.unshift(obj);
            }


            // this.$store.commit('SET_JOB_DATA',res?.data?.job);
            // localStorage.setItem('jobData',JSON.stringify(res?.data?.job));
          }

          if (index == 0) {
            this.$store.commit("SET_JOB_DATA", this.client_data2[0]?.job);
            this.$store.commit('SET_USERTOCHAT', this.userFirst?.type == 'lawyer' ? this.client_data2[0]?.client : this.client_data2[0]?.lawyer);
            console.log('maaz 2 : ', this.userSecond);
          }
          console.log('is start chat :1 ', startChat);
          if (startChat) {
            console.log('is start chat :1 under if', startChat);
            this.startChatForAllMessages(this.client_data2[index], false, 0);
          }
        }

        // if no message exists and client come from proposal
        // start
        if (this.client_data2.length == 0 && res?.data?.job != null) {
          let obj = {
            job: res?.data?.job,
            client_seen: 1
          }
          obj[this.userSecond?.type] = this.userSecond;
          // add user in user list with job id if chat is new
          this.client_data2.unshift(obj);
          if (startChat) {
            this.startChatForAllMessages(this.client_data2[0], false, 0);
          }
        }
        // end

        if (this.userFirst?.type == "lawyer" && this.isNotHeaderChatComputed && this.client_data2.length == 0) {
          let obj = {
            job: res?.data?.job,
          }
          obj[this.userSecond?.type] = this.userSecond;
          this.client_data2.unshift(obj);
          console.log('is start chat :2', startChat);
          if (startChat) {
            console.log('is start chat :2 under if', startChat);
            this.startChatForAllMessages(this.client_data2[0], false, 0);
          }
        }

        console.log('in de x : ', this.client_data);
        console.log('in de x 2 : ', this.client_data.filter((item) => item?.id == this.userSelectedIndex));
        const selectedJobIndex = this.client_data.findIndex(item => item.id === this.userSelectedIndex)
        const selectedJob = this.client_data.filter((item) => item?.id == this.userSelectedIndex)

        const checkSeen = (this.loginUser?.type == "client") ? selectedJob[0]?.client_seen : selectedJob[0]?.lawyer_seen;

        if (selectedJob && selectedJob.length > 0 && !checkSeen && selectedJobIndex >= 0 && index != -1) {
          this.userSeenStatusUpdate(selectedJob[0], selectedJobIndex);
        }

        console.log(' cleint data : ', this.client_data);
      }).catch((err) => {
        console.log(err);
      })
    },

    moveObjectToTop(array, chatId) {
      const index = array.findIndex(obj => obj.chat_id === chatId);

      if (index !== -1) {
        // Remove the object from its current position
        const removedObject = array.splice(index, 1)[0];

        // Add the removed object to the beginning of the array
        array.unshift(removedObject);
      }
    },

    scrollToBottom() {
      // Access the element using the $refs object
      const msgbox = this.$refs.msgbox;

      // Scroll to the bottom
      if (msgbox) {
        msgbox.scrollTop = msgbox.scrollHeight;
      }
    },

    filterItems() {
      const query = this.searchClient.toLowerCase();
      console.log(query);
      console.log('item : ', this.client_data);
      const arr = this.client_data.filter((item) => {
        const fullName = `${item?.client?.first_name ?? item?.lawyer?.first_name} ${item?.client?.last_name ?? item?.lawyer?.last_name}`.toLowerCase();
        console.log('filter name : ', fullName);
        console.log('query name : ', query);
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

    // new or old 
    checkChatStatusForLawyer() {
      // if (this.messages.length > 0) {
      // const lastMessage = this.messages[this.messages.length - 1];
      // const emailInLastMessage = this.messages.length > 0 && lastMessage.sender_email === this.userFirst?.email;
      // const emailInOtherMessages = this.messages.slice(0, -1).some(message => message.sender_email === this.userFirst?.email);
      // console.log('lastMessage : ', lastMessage);
      // console.log('emailInLastMessage : ', emailInLastMessage);
      // console.log('emailInOtherMessages : ', emailInOtherMessages);



      const userFirstEmail = this.userFirst?.email;
      const userSecondEmail = this.userSecond?.email;
      const indexOfUserFirst = this.messages.findIndex(message => message.sender_email === userFirstEmail);

      console.log('c 1 : ', this.messages);
      console.log('c 2 : ', userFirstEmail);
      console.log('c 3 : ', indexOfUserFirst);

      if (indexOfUserFirst !== -1) {
        this.lawyerMessageExist = true;
        // Check if userSecond?.email exists after the first occurrence of userFirst?.email
        const userSecondExistsAfterUserFirst = this.messages
          .slice(indexOfUserFirst + 1)
          .some(message => message.sender_email === userSecondEmail);

        if (userSecondExistsAfterUserFirst) {
          console.log('old if if if');
          this.$store.commit("SET_CHATSTATUS", "old");
        } else {
          console.log('new if if if');
          console.log(`${userSecondEmail} does not exist after the first occurrence of ${userFirstEmail}.`);
          this.$store.commit("SET_CHATSTATUS", "new");
        }
      } else {
        console.log('else if if if');
        console.log(`${userFirstEmail} not found in messages.`);
        this.$store.commit("SET_CHATSTATUS", "new");
      }


      // if (emailInOtherMessages && !emailInLastMessage) {
      //   this.$store.commit("SET_CHATSTATUS", "old");
      // }else{
      //   this.$store.commit("SET_CHATSTATUS", "new");
      // } 

      // else if (!emailNotInOtherMessages && emailInLastMessage) {
      //   this.$store.commit("SET_CHATSTATUS", "new");
      // } else {
      //   console.log(`${this.userFirst?.email} either does not exist in the last message or is present in other messages.`);
      //   this.$store.commit("SET_CHATSTATUS", "old");
      // }
      // }
      // else{
      //   this.$store.commit("SET_CHATSTATUS", "new");
      // }
    },


    // checkChatStatusForLawyer() {
    //   const userFirstEmail = this.userFirst?.email;
    //   const userSecondEmail = this.userSecond?.email;

    //   const indexOfUserFirst = this.messages.findIndex(message => message.sender_email === userFirstEmail);

    //   if (indexOfUserFirst !== -1 && indexOfUserFirst < this.messages.length - 1) {
    //     // Check if userSecond?.email exists after the first occurrence of userFirst?.email
    //     const userSecondExistsAfterUserFirst = this.messages
    //       .slice(indexOfUserFirst + 1)
    //       .some(message => message.sender_email === userSecondEmail);

    //     if (userSecondExistsAfterUserFirst) {
    //       console.log(`${userSecondEmail} exists after the first occurrence of ${userFirstEmail}.`);
    //       this.$store.commit("SET_CHATSTATUS", "new");
    //     } else {
    //       console.log(`${userSecondEmail} does not exist after the first occurrence of ${userFirstEmail}.`);
    //       this.$store.commit("SET_CHATSTATUS", "old");
    //     }
    //   } else {
    //     console.log(`${userFirstEmail} not found or is the last message.`);
    //     this.$store.commit("SET_CHATSTATUS", "new");
    //   }
    // },


    // this.$store.commit("SET_JOB_DATA", data?.job);

    startChatForAllMessages(data, changeJobData = true, rowIndex = null) {

      console.log('user 1 data : ', this.userFirst);
      console.log('user 2 data : ', this.userSecond);

      // if (this.userFirst?.type == "lawyer") {
      //   this.checkChatStatusForLawyer();
      //   // console.log('messages show : ', this.messages);
      //   // console.log('t1 : ', data)
      //   // if (data?.job?.lawyer_chat == null) {
      //   //   console.log('t2 : ')
      //   //   this.$store.commit("SET_CHATSTATUS", "new");
      //   // } else {
      //   //   console.log('t3 : ')
      //   //   this.$store.commit("SET_CHATSTATUS", "old");
      //   // }
      // }

      console.log("start chat for all messages");
      const index = data?.id;
      if (changeJobData) {
        this.$store.commit("SET_JOB_DATA", data?.job);
        // this.$store.commit('SET_USERTOCHAT', data?.client);
        this.$store.commit('SET_USERTOCHAT', this.userFirst?.type == 'lawyer' ? data?.client : data?.lawyer);
      }
      console.log('ddddd ttttt aaa  : ', data);
      this.myJobData = data?.job;
      console.log('hit 1')
      this.userSelectedIndex = index;
      this.clientSelected = true;

      this.chatId = data?.chat_id;
      this.hideInput = data?.is_closed;
      console.log('load run run run')
      this.loadMessages(true);
      console.log('seen : ', data?.client_seen);
      console.log('indeex : ', rowIndex);

      const checkSeen = (this.loginUser?.type == "client") ? data?.client_seen : data?.lawyer_seen;

      if (!checkSeen && rowIndex != null) {
        console.log('under');
        this.userSeenStatusUpdate(data, rowIndex);
      }

      console.log('hit 22222222222222222  : ', data);
    },

    closeChatForAllMessages() {
      this.clientSelected = false;
      this.$store.commit('SET_USERTOCHAT', null);
      this.chatId = null;
      this.messages = [];
    },




    userSeenStatusUpdate(data, index) {
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      // console.log(this.messages);
      // if (this.messages.length > 0) {
      const type = this.loginUser?.type;
      api2.post('/update-seen-status', { "id": data?.id, "status": true, type }).then(() => {
        // console.log(this.lawyer_data)
        console.log(index)
        type == "client" ? this.client_data[index].client_seen = 1 : this.client_data[index].lawyer_seen = 1;
      }).catch((err) => {
        console.log(err);
      })
      // }
    },

    loadMessages(runSnapshot) {
      console.log('chat id 1::::: ', this.chatId);
      if (this.chatId == null) {
        // this.chatId = (this.userFirst?.type == "lawyer") ? `${this.userFirst?.email}_${this.userSecond?.email}` : `${this.userSecond?.email}_${this.userFirst?.email}`;
        this.chatId = (this.userFirst?.type == "lawyer") ? `${this.userFirst?.id}_${this.userSecond?.id}` : `${this.userSecond?.id}_${this.userFirst?.id}`;
        this.chatId = `${this.chatId}_${this.jobId}`;
      }
      console.log('chat id 2::::: ', this.chatId);
      const messagesRef = collection(db, 'chats', this.chatId, 'messages');
      console.log('chat id 3::::: ', messagesRef);
      console.log('chat id 3 3::::: ', this.messages)

      // Store the unsubscribe function
      if (this.messageUnsubscribe) {
        this.messageUnsubscribe();
      }

      if (runSnapshot) {
        this.messageUnsubscribe = onSnapshot(messagesRef, (snapshot) => {
          console.log('che dt id : ', this.chatId);
          console.log('snap :::: ', snapshot);
          console.log('load run ', runSnapshot);

          // this.messages = snapshot.docs.map(doc => doc.data()).sort((a, b) => a.timestamp - b.timestamp);
          this.getMessages(messagesRef)
            .then((messages) => {
              this.messages = messages;
              if (this.userFirst?.type == "lawyer") {
                this.checkChatStatusForLawyer();
              }
            }).catch((err) => console.log(err));
        });
      }

      console.log('chat id 4::::: 4', this.messages);

    },


    getMessages(messagesRef) {
      // console.log('db ::: ' , db);
      return new Promise((resolve, reject) => {
        onSnapshot(
          messagesRef,
          (snapshot) => {
            const messages = snapshot.docs
              .map((doc) => doc.data())
              .sort((a, b) => a.timestamp - b.timestamp);
            resolve(messages);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },


    sendMessage() {
      console.log(addDoc);
      console.log(serverTimestamp);
      console.log(this.chatStatus);
      console.log(this.userFirst?.type);

      if (this.newMessage == "" || this.newMessage == null) {
        return false;
      }

      if (this.messages.length > 0 && this.userFirst?.type == 'lawyer' && this.chatStatus == "new" && this.lawyerMessageExist) {
        // if (
        // this.messages.length == 1 &&
        // this.messages[0]?.sender_email == this.userFirst?.email
        // ) {
        this.$swal("", "You are only permitted to send one message initially. If the potential client responds to your message then you will be able to communicate freely.", "error");
        this.newMessage = '';
        return false;
        // }
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
        sender_name: `${this.userFirst?.first_name}`,
        sender_email: this.userFirst?.email,
        text: this.newMessage,
        timestamp: serverTimestamp(),
      }).then((docRef) => {
        console.log(this.userFirst);


        console.log('dosra user : ', this.userSecond);


        // if (this.chatStatus == "new" && this.userFirst?.type == "lawyer") {
        console.log(' cht status : ', this.chatStatus);
        this.saveChatInDB();
        // if (this.chatStatus != "new" && this.userFirst?.type == "lawyer") {
        //   const type = this.loginUser?.type;
        //   api2.post('/update-seen-status', { "id": this.chatId, "status": false, type });
        // }
        // let replyStatus = false;
        // if(this.userFirst?.type == "client") {
        //   replyStatus = true;
        // }
        // api.post('/update-reply-status', { "id": this.chatId , "status" : replyStatus});

        const payload = {
          title: "New Message",
          noti_status: "message",
          sender_id: this.userFirst?.id,
          receiver_id: this.userSecond?.id,
          chat_id: this.chatId,
        }

        api2.post('/send-notification', payload).then((res) => {
          console.log(res);
        }).catch((error) => {
          console.log(error);
        });

        console.log('Document written with ID:', docRef.id);
      })
        .catch((error) => {
          console.error('Error adding document:', error);
        });
      this.newMessage = '';
    },

    saveChatInDB() {
      const lawyer_id = (this.userFirst?.type == "lawyer") ? this.userFirst?.id : this.userSecond?.id;
      const client_id = (this.userFirst?.type == "client") ? this.userFirst?.id : this.userSecond?.id;
      if (this.chatStatus == "new" || (this.userFirst?.type == 'client' && this.messages.length == 1)) {
        api2.post('/save-chat-info', { "type": this.userFirst?.type, "lawyer_id": lawyer_id, "client_id": client_id, "job_id": this.jobId, "chat_id": this.chatId }).then(() => {
          // this.$store.commit('SET_CHATSTATUS', 'old');
        }).catch((err) => {
          console.log(err);
        })
      }

      // update client seen status and send email to lawyer about client first time reply on his message 
      // this.messages.length > 1
      if (this.userFirst?.type == 'client') {
        // .slice(0, -1);
        const messagesExceptLast = this.messages;
        const lawyerMessageExist = messagesExceptLast.some(msg => msg.sender_email == this.userSecond?.email);
        if (lawyerMessageExist) {
          api2.post('/update-reply-status', { "id": this.chatId, "status": 1 }).then(() => {
            // this.$store.commit('SET_CHATSTATUS', 'old');
          }).catch((err) => {
            console.log(err);
          })
        }
      }



    }

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

.bg-col {
  background: #373b3e;
  border-radius: 5px;
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

.lawyer .chat-messages .message .own-message .text,
.lawyer .chat-messages .message .against-msg .text,
.chat-messages .message .own-message .text,
.chat-messages .message .against-msg .text {
  max-width: 90%;
  line-break: anywhere;
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

section.chatSection {
  position: relative;
  min-height: 100vh;
}

@media screen and (max-width: 1600px) {
  .mb {
    padding-bottom: 50px;
  }
}

@media screen and (max-width: 1200px) {
  .main-container {
    max-width: 98%;
  }
}

@media screen and (max-width: 768px) {

  h4 {
    font-size: 20px;
  }
}

@media screen and (max-width: 767px) {
  .footer {
    position: relative;
  }

  .mb {
    padding-bottom: 10px;
  }

  .chatbox {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    margin-left: 0 !important;
  }

  h4 {
    font-size: 16px;
  }
}

@media screen and (max-width: 480px) {

  /* .lawname{
    font-size: 12px;
  } */
  .chatbox {
    width: 100%;
    margin: 0 auto;
    margin-top: 10px;
    margin-left: 0 !important;
  }

  .badge,
  .smallFont {
    padding: 6px;
  }
}

@media screen and (max-width: 350px) {
  .chat-input {
    flex-wrap: wrap;
  }

  .chat-input button {
    width: -webkit-fill-available;

  }
}
</style>