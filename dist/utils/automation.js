import CronTime from "cron-time-generator";
import cron from "node-cron";
import sendGreetingText from "./greetings";
const morningTime = CronTime.everyDayAt(7, 10);
const automate = cron.schedule(morningTime, () => {
    sendGreetingText();
});
export { automate };
