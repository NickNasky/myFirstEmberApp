import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selection(){
      let messages = this.get('messages');
      this.get('selection')(messages);
    },
    makeStarred(){
      let messages = this.get('messages');
      this.get('makeStarred')(messages);
    }
  }
});
