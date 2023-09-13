import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "my-sst-app",
      region: "ap-southeast-2",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
