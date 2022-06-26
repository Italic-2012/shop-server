$(function () {
  app.init();
  $('.aside h4').click(function () {
    $(this).siblings('ul').slideToggle();
  });
});

const app = {
  init: function () {
    this.confirmRemove();
  },

  confirmRemove() {
    $('.delete').click(function () {
      const flag = confirm('您确定要删除吗？');
      return flag;
    });
  },
};
