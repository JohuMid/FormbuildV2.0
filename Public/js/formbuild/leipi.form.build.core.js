(function () {
  var LPB = window.LPB = window.LPB || {
    plugins: [],
    genSource: function () {
      //获取
      var $temptxt = $("<div>").html($("#build").html());

      //scrubbbbbbb
      $($temptxt).find(".component").attr({
        "title": null,
        "data-original-title": null,
        "data-type": null,
        "data-content": null,
        "rel": null,
        "trigger": null,
        "style": null
      });
      $($temptxt).find(".valtype").attr("data-valtype", null).removeClass("valtype");
      $($temptxt).find(".component").removeClass("component");
      $($temptxt).find("form").attr({"id": null, "style": null});
      $("#source").val($temptxt.html().replace(/\n\ \ \ \ \ \ \ \ \ \ \ \ /g, "\n"));
    }

  };
  /* 表单名称控件 form_name
  acc  是 class="component" 的DIV
  e 是 class="leipiplugins" 的控件
  */
  LPB.plugins['form_name'] = function (active_component, leipiplugins) {
    var plugins = 'form_name', popover = $(".controls");

    //  初始化值
    $(popover).find("#orgvalue").val($('#head').text());
    //  取消控件
    $(popover).delegate(".btn-danger", "click", function (e) {
      e.preventDefault();

      $('.test').empty()

    });
    //  确定控件
    $(popover).delegate(".btn-info", "click", function (e) {

      e.preventDefault();//阻止元素发生默认的行为(例如,当点击提交按钮时阻止对表单的提交

      $('#head').html($('.head').val())

      LPB.genSource();//重置源代码

    });

  }
})();
$(document).ready(function () {
  $("#navtab").delegate("#sourcetab", "click", function (e) {
    LPB.genSource();
  });
  //监听控件拿起的瞬间
  $("form").delegate(".component", "mousedown", function (md) {

    md.preventDefault();
    var tops = [];
    //获取鼠标点击位置
    var mouseX = md.pageX;
    var mouseY = md.pageY;
    //获取整个控件对象
    var $temp;
    var timeout;
    var $this = $(this);
    //鼠标延迟
    var delays = {
      main: 0,
      form: 120
    }

    var type;

    if ($this.parent().parent().parent().parent().attr("id") === "components") {
      type = "main";
    } else {
      type = "form";
    }

    /**
     * BUG
     * 多个相同控件会混淆
     *
     */

    var tar_pos = $('#target').position();
    var mu_mouseX = md.pageX;
    var mu_mouseY = md.pageY;
    var className = $this.attr("name");
    var target;


    //在表单范围内
    if (mu_mouseX > tar_pos.left &&
      mu_mouseX < tar_pos.left + $("#target").width() &&
      mu_mouseY > tar_pos.top &&
      mu_mouseY < tar_pos.top + $("#target").height()
    ) {
      target = $(this)

    } else {
      switch (className) {
        case 'controls1':
          target = $("#tab2 [name='controls1']").eq(0);
          break;
        case 'controls2':
          target = $("#tab2 [name='controls2']").eq(0);
          break;
        case 'controls3':
          target = $("#tab2 [name='controls3']").eq(0);
          break;
        case 'controls4':
          target = $("#tab2 [name='controls4']").eq(0);
          break;
        case 'controls5':
          target = $("#tab2 [name='controls5']").eq(0);
          break;
        case 'controls6':
          target = $("#tab2 [name='controls6']").eq(0);
          break;
        case 'controls7':
          target = $("#tab2 [name='controls7']").eq(0);
          break;
        case 'controls8':
          target = $("#tab2 [name='controls8']").eq(0);
          break;
        case 'controls9':
          target = $("#tab2 [name='controls9']").eq(0);
          break;
        case 'controls10':
          target = $("#tab2 [name='controls10']").eq(0);
          break;
        case 'controls11':
          target = $("#tab2 [name='controls11']").eq(0);
          break;
      }
    }


    var delayed = setTimeout(function () {
      if (type === "main") {
        $temp = $("<form class='form-horizontal span6' id='temp'></form>").append(target.clone());

      } else {
        if (target.attr("id") !== "legend") {
          $temp = $("<form class='form-horizontal span6' id='temp'></form>").append(target);
        }
      }
      // console.log($temp[0].innerHTML);

      $("body").append($temp);

      //使得控件随着鼠标一起移动
      $temp.css({
        "position": "absolute",
        "top": mouseY - ($temp.height() / 2) + "px",
        "left": mouseX - ($temp.width() / 2) + "px",
        "opacity": "0.9"
      }).show()

      var half_box_height = ($temp.height() / 2);
      var half_box_width = ($temp.width() / 2);
      var $target = $("#target");
      var tar_pos = $target.position();
      var $target_component = $("#target .component");

      $(document).delegate("body", "mousemove", function (mm) {

        //实时获取鼠标位置
        var mm_mouseX = mm.pageX;
        var mm_mouseY = mm.pageY;

        $temp.css({
          "top": mm_mouseY - half_box_height + "px",
          "left": mm_mouseX - half_box_width + "px"
        });

        if (mm_mouseX > tar_pos.left &&
          mm_mouseX < tar_pos.left + $target.width() + $temp.width() / 2 &&
          mm_mouseY > tar_pos.top &&
          mm_mouseY < tar_pos.top + $target.height() + $temp.height() / 2
        ) {
          $("#target").css("background-color", "#fafdff");
          $target_component.css({"border-top": "1px solid white", "border-bottom": "none"});
          tops = $.grep($target_component, function (e) {
            return ($(e).position().top - mm_mouseY + half_box_height > 0 && $(e).attr("id") !== "legend");
          });
          if (tops.length > 0) {
            $(tops[0]).css("border-top", "1px solid #22aaff");
          } else {
            if ($target_component.length > 0) {
              $($target_component[$target_component.length - 1]).css("border-bottom", "1px solid #22aaff");
            }
          }
        } else {
          $("#target").css("background-color", "#fff");
          $target_component.css({"border-top": "1px solid white", "border-bottom": "none"});
          $target.css("background-color", "#fff");
        }
      });


      //监听控件放下的瞬间
      $("body").delegate("#temp", "mouseup", function (mu) {

        mu.preventDefault();

        //控件放下时候鼠标位置
        var mu_mouseX = mu.pageX;
        var mu_mouseY = mu.pageY;

        var tar_pos = $target.position();

        $("#target .component").css({"border-top": "1px solid white", "border-bottom": "none"});

        // 检测鼠标在合法位置
        if (mu_mouseX + half_box_width > tar_pos.left &&
          mu_mouseX - half_box_width < tar_pos.left + $target.width() &&
          mu_mouseY + half_box_height > tar_pos.top &&
          mu_mouseY - half_box_height < tar_pos.top + $target.height()
        ) {


          $temp.attr("style", null);
          // where to add
          if (tops.length > 0) {
            $($temp.html()).insertBefore(tops[0]);
            // $("#target [name=" + className + "]").removeClass('component');

          } else {
            $("#target fieldset").append($temp.append("\n\n\ \ \ \ ").html());
            // $("#target [name=" + className + "]").removeClass('component');


          }
        } else {
          // no add
          $("#target .component").css({"border-top": "1px solid white", "border-bottom": "none"});
          tops = [];
          // $('.test').empty()
        }

        //clean up & add popover
        $target.css("background-color", "#fff");
        $(document).undelegate("body", "mousemove");
        $("body").undelegate("#temp", "mouseup");
        //移除超出范围的控件
        $temp.remove();
        //重置源代码
        LPB.genSource();
      });
    }, delays[type]);

    $(document).mouseup(function () {
      clearInterval(delayed);
      return false;
    });
    $(this).mouseout(function () {
      clearInterval(delayed);
      return false;
    });
  });

  //控件点击事件
  $("#target").delegate(".control-group", "click", function (e) {


    e.preventDefault();
    var active_component = $(this);

    $('.test').html($(this).attr("data-content"));

    //class="leipiplugins"
    var leipiplugins = active_component.find(".leipiplugins"), plugins = $(leipiplugins).attr("leipiplugins");//leipiplugins="text"
    //exec plugins
    if (typeof (LPB.plugins[plugins]) == 'function') {
      try {
        LPB.plugins[plugins](active_component, leipiplugins);
      } catch (e) {
        alert('控件异常');
      }
    } else {
      alert("控件有误或不存在");
    }
  });

  /*$("#target").delegate(".control-group", "mouseover", function (e) {
    e.preventDefault();

    var html = `
    <div class="tools" style="position: absolute;right: 0;top: 0;">
                                            <i style="font-size: 30px" class="icon-trash" title="删除"></i>
                                            <i class="icon-plus" title="添加"></i>
                                        </div>
    `;
    $(this).prepend(html);


  })

  $("#target").delegate(".control-group", "mouseleave", function (e) {

    $('div').remove('.tools');

  })*/
});