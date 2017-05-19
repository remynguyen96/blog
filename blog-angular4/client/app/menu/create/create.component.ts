import { Component, OnInit, ElementRef, HostListener, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { trigger, animate, style, state, transition, keyframes } from "@angular/core";
import { Router } from '@angular/router';
import { Title, Meta } from "@angular/platform-browser";
import { MenuService } from "../shared/menu.service";
declare var $,Materialize : any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent implements OnInit, AfterViewInit {

  private listSidebarMenu : any[] = [];
  private menuRoot : any[] = [];

  constructor(
    private titleService : Title,
    private metaService : Meta,
    private menuService : MenuService,
    private router: Router,
    private elm: ElementRef,
  ) {
    titleService.setTitle('Create Menu For Blog');
    metaService.addTags([
      {name: 'author', content: 'Remy Nguyen'},
      {name: 'keywords', content: 'Create menu for blogs'},
      {name: 'description', content: 'This is create menu page !'},
    ]);
  }

  ngOnInit(){
    document.body.id = "menu";
    this.menuService.getDataMenu().subscribe(
      data => {
        this.listSidebarMenu = data.listSidebarMenu;
        this.menuRoot = data.menuRoot;
      },
      err => {
        Materialize.toast(`<span class="notiError">
          There is a problem, please try again !
        </span>`, 4000);
        console.log(`error : ${err}`);
      },
    )
  }

  ngAfterViewInit() {

    var ajax_handing : boolean = false;
    var urlApiMenu : string = this.menuService.URLservice;
    // Menu backend
    window.onload = () =>{
      $(".list-menu ul.nav-tabs li:first-child > a").trigger('click');
    }

    $(document).on('click','.list-menu .nav-tabs .callMenu a',function(){
        var href_menu = $(this).attr('href').split('#')[1];
        getMenu(href_menu);
    });

    // Template New Menu
    $("#createMenu a").click(function(e){
        $(".list-menu .tab-content .tab-pane").removeClass('active');
        $(".list-menu .tab-content #loading").fadeIn();
        e.preventDefault();
        setTimeout(()=>{
            $(".list-menu .tab-content #loading").hide();
            $(".list-menu .tab-content .tab-pane").addClass('active');
            var html = '<form id="formCreateMenu">';
                    html += '<div class="form-group name">';
                        html += '<i class="fa fa-pencil" aria-hidden="true"></i>';
                        html += '<input type="text" id="name" name="name" placeholder="Tên menu">';
                        html += '<p class="errors"></p>';
                    html += '</div>';
                    html += '<div class="form-group alias">';
                        html += '<i class="fa fa-share" aria-hidden="true"></i>';
                        html += ' <input type="text" id="alias" name="alias" placeholder="Alias menu">';
                        html += ' <p class="errors"></p>';
                    html += '</div>';
                    html += ' <button md-raised-button type="submit" name="button">Create Menu</button>';
                html += '</form>';
            $(".list-menu .tab-content .tab-pane").html(html);
            CreateMenuRoot();
        },300)
    });

    // Handing Remove Menu Root
    $(document).on('click','.list-menu .nav-tabs .callMenu i',function(e){
        var href = e.target.parentElement.children[0].getAttribute('href').split('#')[1];
        $.ajax({
            url : `${urlApiMenu}/remove-menu-root`,
            type : 'DELETE',
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
            },
            data : { alias : href },
            success : function(response){
                if(response.errors){
                    Notification(response.errors,0);
                    window.location.reload();
                }
                if(response.success){
                    Notification(response.success,1);
                    e.target.parentElement.remove();
                    $(".list-menu ul.nav-tabs #createMenu a").trigger('click');
                }
            },
        })
    });

    // Update Menu
    var UpdateMenu = function (e) {
      var data = $('.dd.menuDragDrop').nestable('serialize');
      var root = $(".list-menu .callMenu.active a").attr('href').split('#')[1];
      if(data){
        $.ajax({
            url : `${urlApiMenu}/update-menu`,
            type : 'PUT',
            beforeSend: function(xhr) {
              xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
            },
            data : { data : data, root : root },
            success : function(response){
              if(response.success){
                Notification(response.success,1);
              }
              if(response.errors){
                Notification(response.errors,0);
              }
            },
        })
      }
    };

    // Handing Create Menu Children
    function createMenuChild(){
        var ajax_handing = false;
        $(".menuSidebar .btn_addMenu").click(function(){
            var listInput = $(this).closest('.menuSidebar').find('input');
            var aliasParent = $(".list-menu .callMenu.active a").attr('href').split('#')[1];
            var allResult = [];
            listInput.each(function(index,value){
                if($(this).is(':checked')){
                  var arrResult = { name : $(this).attr('name'), alias : $(this).val() }
                  allResult.push(arrResult);
                }
            });
            if(allResult.length > 0){
                $.ajax({
                    url : `${urlApiMenu}/add-menu-children`,
                    type : 'POST',
                    beforeSend: function(xhr) {
                      xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                    },
                    data : { data : allResult, aliasParent : aliasParent },
                    success : function(response){
                      Notification(response.success,1);
                      var tab_pane = $(".tab-pane .menuDragDrop > .dd-list");
                      response.arrData.forEach(function(value,index){
                        tab_pane.append(renderItemMenu(value.name,value.alias,value.id));
                      });
                    },
                })
                $(this).closest('.menuSidebar')[0].reset();
              }
        });
    }

    // Handing Show and Hidden Edit Menu Children
    function showHandingChildren(){
      var ajax_handing = false;
      $('.menuDragDrop').on('click',".dd-item > a",function(e){
            e.preventDefault();
            var content = $(this).closest(".dd-item").find("> .content");
            var id = $(this).closest(".dd-item").attr('data-id');
            var handle_name = $(this).closest(".dd-item").find("> .dd-handle");
            var name = $(this).closest(".dd-item").find("> .content").find('#name');
            var alias = $(this).closest(".dd-item").find("> .content").find('#alias');
            var edit = $(this).closest(".dd-item").find("> .content").find('.editMenu');
            var remove = $(this).closest(".dd-item").find("> .content").find('.removeMenu');
            var errorName = $(this).closest(".dd-item").find("> .content").find('.name').find('.errors');
            var errorAlias = $(this).closest(".dd-item").find("> .content").find('.alias').find('.errors');
            if($(this).find('i').hasClass("fa-caret-down")){
                $(this).find('i').removeClass("fa-caret-down").addClass('fa-caret-up');
            }else{
                $(this).find('i').removeClass("fa-caret-up").addClass('fa-caret-down');
            }
            if(content.hasClass('active')){
                content.removeClass("bounceIn");
                content.addClass("bounceOut");
                setTimeout(() =>{
                    content.removeClass("active bounceOut");
                },300)
            }else{
                content.removeClass("bounceOut");
                content.addClass("active bounceIn");
            }
            name.keyup((e) => {
                var name_val = e.target.value;
                alias.val(convertStr(name_val));
            });
            alias.change((e) => {
                alias.val(convertStr(e.target.value));
            });
            // Handing Edit Menu Children
                edit.click(function(){
                    if(name.val().trim() === ''){
                        errorName.html('Vui lòng nhập tên menu !');
                        name.focus();
                        errorName.stop().fadeIn();
                        setTimeout(() => {
                            errorName.stop().fadeOut();
                        },2500);
                        return false;
                    }
                    else if(alias.val() === ''){
                        errorAlias.html('Vui lòng nhập alias menu !');
                        alias.focus();
                        errorAlias.stop().fadeIn();
                        setTimeout(() => {
                            errorAlias.stop().fadeOut();
                        },2500);
                        return false;
                    }else{
                        $.ajax({
                            url:`${urlApiMenu}/edit-menu-children`,
                            type:"PUT",
                            beforeSend: function(xhr) {
                              xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                            },
                            data : { id : id, name : name.val(), alias : alias.val() },
                            success:function(response){
                              if(response.errors){
                                  if(response.errors.name){
                                      response.errors.name.forEach(function(value,index){
                                          errorName.html(value);
                                          alias.focus();
                                          errorName.stop().fadeIn();
                                          setTimeout(() => {
                                              errorName.stop().fadeOut();
                                          },2500);
                                          return false;
                                      });
                                  }
                                  if(response.errors.alias){
                                      response.errors.alias.forEach(function(value,index){
                                          errorAlias.html(value);
                                          alias.focus();
                                          errorAlias.stop().fadeIn();
                                          setTimeout(() => {
                                              errorAlias.stop().fadeOut();
                                          },2500);
                                          return false;
                                      });
                                  }
                              }
                              if(response.success){
                                  Notification(response.success,1);
                                  handle_name.html(name.val());
                                  $(this).find('i').removeClass("fa-caret-up").addClass('fa-caret-down');
                                    content.removeClass("bounceIn");
                                    content.addClass("bounceOut");
                                    setTimeout(() => {
                                        content.removeClass("active bounceOut");
                                    },300)
                              }
                            }
                         })
                    }
                });
            // Handing Remove Menu Children
                remove.click(function(){
                    $(this).closest(".dd-item").remove();
                  $.ajax({
                      url:`${urlApiMenu}/remove-menu-children`,
                      type:"DELETE",
                      beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                      },
                      data : { id : id },
                      success:function(response){
                        if(response.errors){
                          Notification(response.errors,0);
                          window.location.reload();
                        }
                        if(response.success){
                            Notification(response.success,1);
                        }
                      }
                   })
                });
        });
    }

     // Handing Create Menu Children Orthers
    function createMenuChildOrthers(){
        var ajax_handing = false;
        $("#menuOrthers .btn_addMenu").click(function(e){
            e.preventDefault();
            var aliasParent = $(".list-menu .callMenu.active a").attr('href').split('#')[1];
            var url_orthers = $("#menuOrthers #url");
            var name_orthers = $("#menuOrthers #url_name");
            url_orthers.val().trim() === '' ? url_orthers.val(urlApiMenu) : url_orthers.val();
              var dataOrthers = [
                {
                  name : name_orthers.val(),
                  alias : url_orthers.val()
                }
              ];
              $.ajax({
                  url : `${urlApiMenu}/add-menu-children`,
                  type : 'POST',
                  beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                  },
                  data : { data : dataOrthers, aliasParent : aliasParent },
                  success : function(response){
                    Notification(response.success,1);
                    var tab_pane = $(".tab-pane .menuDragDrop > .dd-list");
                    response.arrData.forEach(function(value,index){
                      tab_pane.append(renderItemMenu(value.name,value.alias,value.id));
                    });
                  },
              })
              $(this).closest('#menuOrthers')[0].reset();
        });
    }

    // Handing Get Menu Children From Root
    function getMenu(href : string){
        var ajax_handing = false;
        $(".list-menu .tab-content .tab-pane").removeClass('active');
        $(".list-menu .tab-content #loading").fadeIn();
        setTimeout(() => {
            $.ajax({
                url : `${urlApiMenu}/menu-children`,
                type : 'POST',
                beforeSend: function(xhr) {
                  xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                },
                data : { alias : href },
                success : function(response){
                    $(".list-menu .tab-content .tab-pane").addClass('active');
                    $(".list-menu .tab-content .tab-pane").html(response.menuChildren);
                    createMenuChild();
                    createMenuChildOrthers();
                    $('.dd.menuDragDrop').nestable({
                      maxDepth: 5
                    }).on('change',UpdateMenu);
                    showHandingChildren();
                },
            }).always(function(){
                 $(".list-menu .tab-content #loading").hide();
            });
        },350)
    }

     // Handing Create New Menu Root
    function CreateMenuRoot(){
        var ajax_handing = false;
        $("#formCreateMenu .name #name").keyup(function(e){
            var name = e.target.value;
            $("#formCreateMenu .alias #alias").val(convertStr(name));
        });
        $("#formCreateMenu .alias #alias").change(function(e){
            $("#formCreateMenu .alias #alias").val(convertStr(e.target.value));
        });
        $("#formCreateMenu button").click(function(e){
            e.preventDefault();
            var name = $('#formCreateMenu .name #name').val();
            var alias = $('#formCreateMenu .alias #alias').val();
            if(name.trim() === ''){
                $("#formCreateMenu .name .errors").html('Tên menu không được để trống !');
                return false;
            }
            else if(alias === ''){
                $("#formCreateMenu .alias .errors").html('Alias menu không được để trống !');
                return false;
            }else{
                if(ajax_handing === true){
                    alert("Just a moment !");
                    return false;
                }
                $(".list-menu .tab-content #loading").fadeIn();
                ajax_handing = true;
                setTimeout(function(){
                    $.ajax({
                        url:`${urlApiMenu}/add-menu-root`,
                        type:"POST",
                        beforeSend: function(xhr) {
                          xhr.setRequestHeader("Authorization", 'Bearer ' +localStorage.getItem('auth_token'));
                        },
                        data : { name : name, alias : alias},
                        success:function(response){
                            if(response.errors){
                                if(response.errors.name){
                                  response.errors.name.forEach(function(value,index){
                                      $("#formCreateMenu .name .errors").html(value);
                                      setTimeout(() => {
                                          $("#formCreateMenu .name .errors").html('');
                                      },2500)
                                      return false;
                                  });
                                }
                                if(response.errors.alias){
                                    response.errors.alias.forEach(function(value,index){
                                        $("#formCreateMenu .alias .errors").html(value);
                                        setTimeout(() => {
                                            $("#formCreateMenu .alias .errors").html('');
                                        },2500)
                                        return false;
                                    });
                                }
                            }
                            if(response.success){
                                $("#formCreateMenu .alias .success").fadeIn();
                                Notification(response.success,1);
                                $(renderMenu(name,alias)).insertBefore('.list-menu .nav-tabs #createMenu');
                                $("form#formCreateMenu")[0].reset();
                                $(".list-menu ul.nav-tabs li:first-child > a").trigger('click');
                            }
                        },
                     }).always(function(){
                          $(".list-menu .tab-content #loading").hide();
                          ajax_handing = false;
                     });
                },500)
            }
        });
    }

    function convertStr(str : string) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
        str = str.replace(/-+-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    }


    function Notification(message : any,status : number){
        if(status == 0){
            setTimeout(() => {
                $(".messError").html('<p><i class="fa fa-thumbs-o-down"></i> '+ message+'</p>');
                $(".messError").addClass('animate_auth fadeInDown active');
            },100);
            setTimeout(function(){
                $(".messError").removeClass('fadeInDown');
                $(".messError").addClass('fadeOutDown');
            },2500);
            setTimeout(() => {
                $(".messError").removeClass('animate_auth fadeOutDown active');
                $(".messError").html('');
            },2800);
        }
        if(status == 1){
            setTimeout(() => {
                $(".messSuccess").html('<p><i class="fa fa-thumbs-o-up"></i> '+ message+'</p>');
                $(".messSuccess").addClass('animate_auth fadeInDown active');
            },100);
            setTimeout(() => {
                $(".messSuccess").removeClass('fadeInDown');
                $(".messSuccess").addClass('fadeOutRight');
            },2500);
            setTimeout(() => {
                $(".messSuccess").removeClass('animate_auth fadeOutRight active');
                $(".messSuccess").html('');
            },2800);
        }
        return false;
    }

    function renderMenu(name : string,alias : string){
        let html = `
                      <li class="callMenu" role="presentation">
                      <a data-toggle="tab" md-raised-button role="tab" ng-reflect-href="#${alias}" href="#${alias}" aria-disabled="false" tabindex="0" class="mat-raised-button" aria-expanded="false">
                          <span class="mat-button-wrapper">${name}</span>
                          <div class="mat-button-ripple mat-ripple" md-ripple ng-reflect-trigger="http://localhost:4200/#${alias}"></div>
                          <div class="mat-button-focus-overlay"></div>
                      </a>
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </li>
                    `;
      return html;
    }

    function renderItemMenu(name : string,alias: string,id: number){
        let html = '<li class="dd-item" data-id="'+id+'">';
                html += '<div class="dd-handle">';
                    html += name;
                html += '</div>';
                html += '<a href="#"><i class="fa fa-caret-down" aria-hidden="true"></i></a>';
                html += '<div class="content">';
                    html += '<div class="form-group name">';
                        html += '<i class="fa fa-pencil" aria-hidden="true"></i>';
                        html += '<input type="text" id="name" name="name" value="'+name+'" placeholder="Tên menu">';
                        html += '<div class="errors"></div>';
                    html += '</div>';
                    html += '<div class="form-group alias">';
                        html += '<i class="fa fa-share" aria-hidden="true"></i>';
                        html += ' <input type="text" id="alias" name="alias" value="'+alias+'" placeholder="Alias menu">';
                        html += '<div class="errors"></div>';
                    html += '</div>';
                    html += '<div class="handing">';
                        html += '<button type="button" class="editMenu">Cập nhật <i class="fa fa-check-square-o" aria-hidden="true"></i></button>';
                        html += '<button type="button" class="removeMenu">Xóa <i class="fa fa-window-close-o" aria-hidden="true"></i></button>';
                    html += '</div>';
                html += '</div>';
              html += '</li>';
        return html;
    }




  }


}
