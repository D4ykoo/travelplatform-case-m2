<template>
  <div class="ml-auto mr-auto flex justify-center content-center align-middle">
    <div role="tablist" class="tabs tabs-boxed p-4 fix-width">
      <input
        type="radio"
        name="login-register"
        role="tab"
        class="tab m-auto"
        aria-label="Login"
        checked
      />
      <div role="tabpanel" class="tab-content p-10">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Username</span>
          </div>
          <input
            v-model="loginForm.username.value"
            type="text"
            placeholder="Username"
            class="input input-bordered w-full"
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Password</span>
          </div>
          <input
            v-model="loginForm.password.value"
            type="password"
            placeholder="Password"
            class="input input-bordered w-full"
          />
          <div class="label">
            <span class="label-text-alt"></span>
            <span
              @click="routeReset"
              class="label-text-alt hover:text-violet-600 hover:cursor-pointer"
              >Forgot password?</span
            >
          </div>
        </label>
        <button
          type="submit"
          @click="login"
          class="btn btn-primary w-full mt-4"
        >
          Login
        </button>
      </div>

      <input
        type="radio"
        name="login-register"
        role="tab"
        class="tab"
        aria-label="Register"
      />
      <div role="tabpanel" class="tab-content p-10">
        <div class="flex flex-row">
          <div class="flex flex-col mr-4">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Username</span>
              </div>
              <input
                v-model="registerForm.username.value"
                type="text"
                placeholder="Username"
                class="input input-bordered w-full max-w-xs"
              />
            </label>
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">E-Mail</span>
              </div>
              <input
                v-model="registerForm.email.value"
                type="email"
                placeholder="E-Mail"
                class="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div class="flex flex-col">
            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Firstname</span>
              </div>
              <input
                v-model="registerForm.firstname.value"
                type="text"
                placeholder="Firstname"
                class="input input-bordered w-full max-w-xs"
              />
            </label>

            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Lastname</span>
              </div>
              <input
                v-model="registerForm.lastname.value"
                type="text"
                placeholder="Lastname"
                class="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Password</span>
          </div>
          <input
            v-model="registerForm.password.value"
            type="password"
            placeholder="Password"
            class="input input-bordered w-full"
          />
        </label>
        <button
          type="submit"
          @click="register"
          class="btn btn-primary mt-4 w-9/12 flex ml-auto mr-auto"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import APP_CONFIG from "@/assets/config";
import type { LoginUser, RegisterUser } from "@/models/UserModel";
import { LoginRegisterService } from "@/services/LoginRegisterService";
import { ref, type Ref } from "vue";

let loginRegisterService = new LoginRegisterService();

export default {
  name: "LoginRegister",
  data() {
    return {};
  },
  setup() {
    type RegisterForm = {
      username: Ref;
      firstname: Ref;
      lastname: Ref;
      email: Ref;
      password: Ref;
    };

    type LoginForm = {
      username: Ref;
      password: Ref;
    };

    const registerForm: RegisterForm = {
      username: ref(""),
      firstname: ref(""),
      lastname: ref(""),
      email: ref(""),
      password: ref(""),
    };

    const loginForm: LoginForm = {
      username: ref(""),
      password: ref(""),
    };

    return {
      registerForm,
      loginForm,
    };
  },
  methods: {
    login() {
      console.log(this.$route.query.name);

      var payload: LoginUser = {
        username: this.loginForm.username.value,
        password: this.loginForm.password.value,
      };

      loginRegisterService.LoginRequest(payload).subscribe((res: any) => {
        if (res.status === 200) {
          console.log(this.$route.query.page);
          if (this.$route.query.name === "travmngt") {
            window.location.href = APP_CONFIG.travelManagagementUrl;
          } else {
            this.$router.push("/users");
          }
        }
      });
    },
    register() {
      var payload: RegisterUser = {
        username: this.registerForm.username.value,
        firstname: this.registerForm.firstname.value,
        lastname: this.registerForm.lastname.value,
        email: this.registerForm.email.value,
        password: this.registerForm.password.value,
      };

      loginRegisterService.RegisterRequest(payload).subscribe((res: any) => {
        if (res.status === 200) {
          this.$router.push("/users");
        }
      });
    },
    routeReset() {
      this.$router.push("/reset");
    },
  },
};
</script>
