$(function(){
  var ItemModel = Backbone.Model.extend({
    urlRoot: "items"
  });

  var ItemCollection = Backbone.Collection.extend({
    url: "items/index.json",
    model: ItemModel
  });

  var ItemView = Backbone.View.extend({
    tagName: 'li',

    initialize: function(options){
      this.render();
    },

    render: function(model){
      var content = this.model.get('text');
      this.$el.html(content);
    }
  });

  var ListView = Backbone.View.extend({
    el: "#list",
    initialize: function(options){
      this.items = new ItemCollection();
      this.setEventListeners();
      this.items.fetch();
    },

    setEventListeners: function(){
      _.bindAll(this, 'show');
      _.bindAll(this, 'reset');
      this.listenTo(this.items, 'add', this.addOne);
      this.listenTo(this.items, 'reset', this.addAll);
    },

    addOne: function(model){
      console.log("addOne");
      var item = new ItemView({model:model});
      this.$el.append(item.el);
    },

    addAll:function(){
      var _self = this;
      this.$el.html("");
      _self.items.fetch({success: this.show});
    },

    show: function(){
      this.$el.slideDown(500);
    },

    hideAndReset: function(){
      this.$el.slideUp(500, this.reset);
    },

    reset: function(){
      this.items.reset();
    }
  });

  var list = new ListView();

  $('button').click(function(e){
    list.hideAndReset();
  });
});