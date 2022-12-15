<template>
  <div class="watch flex-col">
    <div class="watch-container flex-col">
      <div class="watch-screen flex-col">
        <div class="action flex-row">
          <div class="btn-container flex-col">
            <span class="btn cancel">Cancel</span>
          </div>
          <div class="btn-container flex-col">
            <span class="btn pause">Pause</span>
          </div>
          <div class="btn-container flex-col">
            <span class="btn start">Start</span>
          </div>
        </div>
      </div>
    </div>
    <div class="main flex-col">
      <div class="time-container flex-row">
        <span class="time-screen">14:32</span>
      </div>
      <div class="music flex-row">
        <div class="playContainer">
          <li class="pre">
            <a href="#" title="pre"></a>
            <a href="#" title="pre"></a>
          </li>

          <li class="playpause">
            <input type="checkbox" value="None" id="playpause" name="check" />
            <label for="playpause"></label>
          </li>

          <li class="next playBtn">
            <a href="#" title="next"></a>
            <a href="#" title="next"></a>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
