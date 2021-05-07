<template>
  <div class="home">
    <input type="text" v-model="inputUserName" placeholder="User Name" />
    <button @click="send">send</button>
    <ul>
      <li v-for="user in users" :key="user.userid">
        {{ user.userId }}
      </li>
    </ul>
    <div v-for="user in users" :key="user.userid">
      <div
        v-if="user.userId !== userName"
        style="position: absolute;"
        :style="{ top: user.position.y + 'px', left: user.position.x + 'px' }"
      >
        x<br />{{ user.userId }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  sockets: {
    users(data) {
      if (data) {
        this.users = data;
      }
    },
  },
  mounted() {
    window.addEventListener("beforeunload", () => {
      console.log("beforeunload");
      this.$socket.emit("disconnect", {
        userId: this.inputUserName,
      });
    });
  },
  data() {
    return {
      inputUserName: "",
      userName: "",
      users: [],
    };
  },
  methods: {
    send() {
      this.userName = this.inputUserName;
      this.$socket.emit("send", {
        userId: this.inputUserName,
        position: { x: -1, y: -1 },
      });
      window.addEventListener("mousemove", (e) => {
        this.$socket.emit("move", {
          userId: this.userName,
          position: { x: e.clientX, y: e.clientY },
        });
      });
      this.inputUserName = "";
    },
  },
};
</script>
