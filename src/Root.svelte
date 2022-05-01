<script>
  import { Router, Link, Route } from "svelte-routing";
  import App from "./App.svelte";
  import PrivacyPolicy from "./PrivacyPolicy.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <div>
    <Route path="privacy"><PrivacyPolicy/></Route>
    <Route path="/"><App /></Route>
  </div>
</Router>