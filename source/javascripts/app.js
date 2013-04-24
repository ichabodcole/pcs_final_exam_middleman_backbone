$(function(){
  var ItemModel = Backbone.Model.extend({
    urlRoot: "items"
  });

  var ItemCollection = Backbone.Collection.extend({
    url: "items/index.json",
    model: ItemModel,

    fetch: function(options){
      _self = this;
      this.reset();
      options = (options = {});
      setTimeout(function(){
        return Backbone.Collection.prototype.fetch.call(_self, options);
      }, 1000);
    }
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
      this.items = options.items;
      this.setEventListeners();
      this.items.fetch();
    },

    setEventListeners: function(){
      // _.bindAll(this, 'show');
      // _.bindAll(this, 'reset');
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
      _.each(this.items, function(item){
        this.addOne(item);
      });
    }
  });

  var items = new ItemCollection();
  var list  = new ListView({items: items});

  $('button').click(function(e){
    items.fetch();
  });
});