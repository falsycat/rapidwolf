"use strict";

import RapidWolf from "./rapidwolf.js";

import "../style/main.scss";

window.addEventListener("DOMContentLoaded", () => {
  let elms = {
    header: document.querySelector("#header"),
    query: {
      form: document.querySelector("#search form"),
      input: document.querySelector("#search input"),
      msg: document.querySelector("#search .query-enter-msg"),
    },
    result: {
      list: document.querySelector("#result"),
      item: document.querySelector("#result template"),
    },
  };

  let rw = new RapidWolf({
    onFetch: (item) => {
      if (!elms.header.classList.contains("minimized")) {
        elms.header.classList.add("minimized");
      }

      let e = document.importNode(elms.result.item.content, true);
      e.querySelector("img").src          = item.thumb;
      e.querySelector(".title").innerText = item.title;
      e.querySelector(".date").innerText  = item.date;
      elms.result.list.appendChild(e);
      e = elms.result.list.lastChild;
      setTimeout(() => {
        e.classList.add("shown");
      }, 100);
    },
  });

  elms.query.input.addEventListener("input", () => {
    elms.query.msg.classList.add("shown");
    setTimeout(() => {
      elms.query.msg.classList.remove("shown")
    }, 1000);
  });
  elms.query.form.addEventListener("submit", (e) => {
    e.preventDefault();
    rw.fetch(elms.query.input.value);
  });
});