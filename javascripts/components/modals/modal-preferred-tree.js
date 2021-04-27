"use strict";

Vue.component("modal-preferred-tree", {
  data() {
    return {
      dimensionPath: null,
      pacePath: null
    };
  },
  created() {
    this.dimensionPath = TimeStudy.prefferedPaths.dimensionPath.path;
    this.pacePath = TimeStudy.prefferedPaths.pacePath.path;
  },
  computed: {
    dimensionOptions() {
      return {
        "Antimatter Dimensions": TIME_STUDY_PATH.ANTIMATTER_DIM,
        "Infinity Dimensions": TIME_STUDY_PATH.INFINITY_DIM,
        "Time Dimensions": TIME_STUDY_PATH.TIME_DIM,
      };
    },
    paceOptions() {
      return {
        "Active": TIME_STUDY_PATH.ACTIVE,
        "Passive": TIME_STUDY_PATH.PASSIVE,
        "Idle": TIME_STUDY_PATH.IDLE
      };
    },
  },
  methods: {
    isPreferred(name) {
      return this.dimensionOptions[name] === this.dimensionPath || this.paceOptions[name] === this.pacePath;
    },
    select(name) {
      if (this.dimensionOptions[name]) this.dimensionPath = this.dimensionOptions[name];
      if (this.paceOptions[name]) this.pacePath = this.paceOptions[name];
    },
    confirmPrefs() {
      TimeStudy.prefferedPaths.dimensionPath = this.dimensionPath;
      TimeStudy.prefferedPaths.pacePath = this.pacePath;
      this.emitClose();
    },
    classList(name) {
      const pref = this.isPreferred(name);
      const types = {
        "Antimatter Dimensions": "antimatter-dim",
        "Infinity Dimensions": "infinity-dim",
        "Time Dimensions": "time-dim",
        "Active": "active",
        "Passive": "passive",
        "Idle": "idle"
      };
      return [
        "o-time-study",
        `o-time-study-${types[name]}--${pref ? "bought" : "available"}`,
        `o-time-study--${pref ? "bought" : "available"}`
      ];
    },
  },
  template: `
  <div class="c-modal-message l-modal-content--centered">
  <h2>First split preference:</h2>
    <div style="display: flex; flex-direction: row; align-items: center;">
      <button
        v-for="(id, name) in dimensionOptions"
        @click="select(name)"
        :class="classList(name)"
        style="font-size: 2rem"
      >
      {{name}}
      </button>
    </div>
  <br>
  <h2>Second split preference:</h2>
    <div style="display: flex; flex-direction: row; align-items: center;">
      <button
        v-for="(id, name) in paceOptions"
        @click="select(name)"
        :class="classList(name)"
        style="font-size: 2rem"
      >
      {{name}}
      </button>
    </div>
  <primary-button
        class="o-primary-btn--width-medium c-modal-import-tree__import-btn c-modal__confirm-btn"
        @click="confirmPrefs"
      >Confirm</primary-button>
  </div>
  `
});

// So, to recap:
// In the beginning, the universe was created.
// This has made a lot of people very angry,
// and has been widely regarded as a bad move.