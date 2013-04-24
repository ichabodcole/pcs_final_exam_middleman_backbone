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

  var ItemList = Backbone.View.extend({
    el: "#list",
    initialize: function(options){
      this.items = new ItemCollection();
      this.listenTo(this.items, 'add', this.addOne);
      this.items.fetch();
    },

    addOne: function(model){
      var item = new ItemView({model:model});
      this.$el.append(item.el);
    },

    addAll:function(){

    }
  });

  var list = new ItemList();
});