import Ember from 'ember';

export default Ember.Controller.extend({
  allSelected: false,
  createMessage: false,
  someSelected: false,
  noneSelected: false,
  allDeleted: false,
  unreadMessages: Ember.computed(countUnread),

  actions: {
    toggleMessage(){
      this.toggleProperty('createMessage')
    },
    toggleStarred(messages){
      if (messages.starred === true) {
        Ember.set(messages, 'starred', false)
      } else {
        Ember.set(messages, 'starred', true)
      }
    },
    toggleChecked(){
      this.toggleProperty('allSelected');
      this.set('someSelected', false);
      for(let i = 0; i  < this.get('model').length; i++) {
        if (this.get('allSelected') === false){
          Ember.set(this.get('model')[i], 'selected', false)
          this.set('noneSelected', true);
        } else {
          Ember.set(this.get('model')[i], 'selected', true)
          this.set('noneSelected', false)
        }
      }
    },
    markAsRead() {
      for (let i = 0; i < this.get('model').length; i++){
        if (this.get('model')[i].selected === true) {
          Ember.set(this.get('model')[i], 'read', true)
        }
      }
      let unread = this.get('model').filter(function(e) {
        if (e.delete === false) {
          return e.read === false
        }
      }).length;
      this.set('unreadMessages', unread);
    },
    markAsUnread() {
      for (let i = 0; i < this.get('model').length; i++){
        if (this.get('model')[i].selected === true) {
          Ember.set(this.get('model')[i], 'read', false)
        }
      }
      let unread = this.get('model').filter(function(e) {
        if (e.delete === false) {
          return e.read === false
        }
      }).length;
      this.set('unreadMessages', unread);
    },
    deleteSelected() {
      for (let i = 0; i < this.get('model').length; i++){
        if (this.get('model')[i].selected === true) {
          Ember.set(this.get('model')[i], 'selected', false)
          Ember.set(this.get('model')[i], 'delete', true)
        }
      }

      let unread = this.get('model').filter(function(e) {
        if (e.delete === false) {
          return e.read === false
        }
      }).length;
      this.set('unreadMessages', unread);

      let deleted = this.get('model').filter(function(e) {
        return e.delete === true;
      }).length
      if (deleted === this.get('model').length) {
        this.set('allDeleted', true)
        this.set('noneSelected', true)
      }
      let selectedMessages = this.get('model').filter(function(e) {
        return e.selected === true;
      }).length
      if (selectedMessages === 0) {
        this.set('allSelected', false);
        this.set('someSelected', false);
        this.set('noneSelected', true);
      } else if(selectedMessages < this.get('model').length) {
        this.set('allSelected', false);
        this.set('someSelected', true);
        this.set('noneSelected', false);
      } else {
        this.set('allSelected', true);
        this.set('someSelected', false);
        this.set('noneSelected', false);
      }
    },

    selectMessage(message) {
      if (message.selected) {
        Ember.set(message, 'selected', false)
      } else {
        Ember.set(message, 'selected', true)
      }
      let selectedMessages = this.get('model').filter(function(e) {
        return e.selected === true;
      }).length;
      if (selectedMessages === 0) {
        this.set('allSelected', false);
        this.set('someSelected', false);
        this.set('noneSelected', true);
      } else if(selectedMessages < this.get('model').length) {
        this.set('allSelected', false);
        this.set('someSelected', true);
        this.set('noneSelected', false);
      } else {
        this.set('allSelected', true);
        this.set('someSelected', false);
        this.set('noneSelected', false);
      }
    },
    addLabel(){
      let label = event.srcElement.value;
      for (let i = 0; i < this.get('model').length; i++){
        if (this.get('model')[i].labels.includes(label) === false) {
          if (this.get('model')[i].selected === true) {
            let newLabels = [];
            for(let j = 0; j < this.get('model')[i].labels.length; j++) {
              newLabels.push(this.get('model')[i].labels[j]);
            }
            newLabels.push(label);
            Ember.set(this.get('model')[i], 'labels', newLabels.sort())
          }
        }
      }
    },
    removeLabel(){
      let label = event.srcElement.value;
      for (let i = 0; i < this.get('model').length; i++){
        if (this.get('model')[i].labels.includes(label) === true) {
          if (this.get('model')[i].selected === true) {
            let newLabels = [];
            for(let j = 0; j < this.get('model')[i].labels.length; j++) {
              if (this.get('model')[i].labels[j] !== label) {
                newLabels.push(this.get('model')[i].labels[j]);
              }
            }
            Ember.set(this.get('model')[i], 'labels', newLabels.sort())
          }
        }
      }
    }
  }
});

function countUnread() {
  return this.get('model').filter(function(e) {
    if (e.delete === false) {
      return e.read === false;
    }
  }).length
}
