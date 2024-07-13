import { LitElement } from 'lit';

export class ApiDataProvider extends LitElement {
  /* this component not use styles- type: data provider */

  static get properties() {
    return {
      protocol: {
        type:String,
        value: null
      },
      host:{
        type:String,
        value: null
      },
      path:{
        type:String,
        value: null
      },
      method:{
        type:String,
        value: 'GET'
      },
    };
  }



  validateProperties(){
    if (this.protocol !== null && this.host !== null && this.path !== null){
      return true;
      }
    return false;
  }

  generateRequest(){
    if(this.validateProperties()){
      fetch(`${this.protocol}://${this.host}/${this.path}`, { method: this.method })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          this._eventDispatcher('success', data)
        })
        .catch((error) => {
          this._eventDispatcher('error', error)
        });
    }
  }



  _eventDispatcher(event, detail) {
    this.dispatchEvent(new CustomEvent(`api-dp-${event}`, {
      bubbles: true,
      composed: true,
      detail: {
        data:detail
      }
    }));

  }


}
