/*
 * 首页数据
 */
import { defineStore } from "pinia";
import Snackbar from "node-snackbar";
type AcMode = "clod" | "hot";
const useHomeStore = defineStore("home", {
  state: () => ({
    authorInfo: {
      author: "Sugar",
      link: "https://blog.imsugar.cn/",
      title: "Sugar - 便携小空调",
    },
    // 空调温度
    temperature: 26,
    // 空调工作状态
    status: false,
    // 空调工作风速
    level: 0,
    // 空调工作模式
    mode: "clod",
    // 空调最大温度
    maxTemperature: 31,
    // 空调最小温度
    minTemperature: 16,
  }),
  actions: {
    /**
     * 修改空调工作状态
     */
    changeStatus() {
      this.status = !this.status;
      this.level = this.status ? 1 : 0;
    },
    /**
     * 修改空调风速
     */
    changeLevel(level) {
      if (this.status) {
        this.level = level;
      }
    },
    /**
     * 修改空调工作模式
     */
    changeMode(mode: AcMode) {
      this.mode = mode;

      const currentTemperature = this.temperature;
      const goodClodTemperature = 26;
      const goodHotTemperature = 20;

      const recommendedSlogan = (mode: AcMode, temperature: number) =>
        `建议将空调的制${mode === "clod" ? "冷" : "热"}温度调至 ${temperature} 度以${
          mode === "clod" ? "上" : "下"
        }，为节能减排贡献一份力量！`;

      if (mode === "clod" && currentTemperature < goodClodTemperature) {
        Snackbar.show({
          text: recommendedSlogan("clod", goodClodTemperature),
          backgroundColor: "#ffc107",
          duration: 2000,
          pos: "top-center",
          showAction: false,
        });
      } else if (mode === "hot" && currentTemperature > goodHotTemperature) {
        Snackbar.show({
          text: recommendedSlogan("hot", goodHotTemperature),
          backgroundColor: "#ffc107",
          duration: 2000,
          pos: "top-center",
          showAction: false,
        });
      }
    },
    /**
     * 增加空调温度
     */
    addTemperature() {
      if (this.temperature < this.maxTemperature) {
        this.temperature++;
      } else {
        Snackbar.show({
          text: "已经达最大温度啦",
          backgroundColor: "#ffc107",
          duration: 2000,
          pos: "top-center",
          showAction: false,
        });
      }
    },
    /**
     * 降低空调温度
     */
    subTemperature() {
      if (this.temperature > this.minTemperature) {
        this.temperature--;
      } else {
        Snackbar.show({
          text: "已经是最小温度啦",
          backgroundColor: "#ffc107",
          duration: 2000,
          pos: "top-center",
          showAction: false,
        });
      }
    },
  },
});

export default useHomeStore;
