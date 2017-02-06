<template>
</template>
<script>
  import Vue from 'vue';
  (function () {
    const vueTap = {};

    function touchstart(e, el, vnode) {
      var touches = e.touches[0];
      var tapObj = self.tapObj;
      tapObj.pageX = touches.pageX;
      tapObj.pageY = touches.pageY;
      tapObj.clientX = touches.clientX;
      tapObj.clientY = touches.clientY;
      tapObj.move = false;
      tapObj.el = el;
      self.time = +new Date();
    }

    function touchmove(e, el, vnode) {
      e.preventDefault();
      var touches = e.changedTouches[0];
      var tapObj = self.tapObj;
      tapObj.distanceX = touches.pageX - tapObj.pageX;
      tapObj.distanceY = touches.pageY - tapObj.pageY;
      tapObj.move = true;
      tapObj.el = el;
      // tapObj.distanceX>0右
      vnode.context.move(tapObj);
    }

    function touchend(e, el, vnode) {
      var touches = e.changedTouches[0];
      var tapObj = self.tapObj;
      tapObj.time = +new Date() - self.time;
      tapObj.distanceX = tapObj.pageX - touches.pageX;
      tapObj.distanceY = tapObj.pageY - touches.pageY;
      tapObj.move = false;
      tapObj.el = el;
      vnode.context.move(tapObj);
    }
    var tap = Vue.directive('tap', {
      isFn: true,
      acceptStatement: true,
      bind(el, binding, vnode) {
        var value = binding.value;
        el.tapObj = {};
        el.addEventListener('touchstart', function (e) {
          if (binding.modifiers.stop)
            e.stopPropagation();
          if (binding.modifiers.prevent)
            e.preventDefault();
          touchstart(e, el, vnode);
        }, false);
        el.addEventListener('touchmove', function (e) {
          touchmove(e, el, vnode);
        }, false);
        el.addEventListener('touchend', function (e) {
          Object.defineProperties(e, {
            "currentTarget": {
              value: el,
              writable: true,
              enumerable: true,
              configurable: true
            },
          });
          return touchend(e, el, vnode);
        }, false);
      },
      update(el, binding, vnode) {
        var self = this;
        self.tapObj = {};
        vnode.context.move(tapObj);
      }
    });
    vueTap.install = function (Vue) {
      Vue.directive('tap', tap);
    };
    if (typeof exports == "object") {
      module.exports = vueTap;
    } else if (typeof define == "function" && define.amd) {
      define([], function () {
        return vueTap
      })
    } else if (window.Vue) {
      window.vueTap = vueTap;
      Vue.use(vueTap);
    };
  })();

</script>
