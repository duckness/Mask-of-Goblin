import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import Buefy from "buefy";
import Icon from "vue-awesome/components/Icon";
import Artifact from "@/components/artifact";
import Hero from "@/components/hero";
import Softcap from "@/components/calculators/Softcap.vue";

Vue.use(Router);
Vue.use(Meta);
Vue.use(Buefy, { defaultIconPack: "fas" });
Vue.component("icon", Icon);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/hero/1"
    },
    {
      path: "/hero",
      redirect: "/hero/1"
    },
    {
      path: "/artifact",
      redirect: "/artifact/1"
    },
    {
      path: "/artifact/:id",
      name: "artifact",
      component: Artifact
    },
    {
      path: "/hero/:id",
      name: "hero",
      component: Hero
    },
    {
      path: "/calc",
      name: "calc",
      component: Softcap
    }
  ]
});
