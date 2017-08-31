import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    toggleMessage(){
      let messages = this.get('messages');
      this.get('toggleMessage')(messages);
    },
    markAsRead(){
      let messages = this.get('messages');
      this.get('markAsRead')(messages);
    },
    markAsUnread(){
      let messages = this.get('messages');
      this.get('markAsUnread')(messages);
    },
    deleteSelected(){
      let messages = this.get('messages');
      this.get('deleteSelected')(messages);
    },
    addLabel(){
      let messages = this.get('messages');
      this.get('addLabel')(messages);
    },
    removeLabel(){
      let messages = this.get('messages');
      this.get('removeLabel')(messages);
    },
    toggleChecked(){
      let messages = this.get('messages');
      this.get('toggleChecked')(messages);
    }
  }
});
