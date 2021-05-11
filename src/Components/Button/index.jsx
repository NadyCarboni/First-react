import './style.css'
import { Component } from 'react';

export class Button extends Component {
    
    render() {
        const {text, onClick, disabled} = this.props;
        return (
            <div class="button-container">
           <button 
        className='button' 
        onClick={onClick}
        disabled ={disabled}
        
      >
        {text}
      </button>
          </div>);
    }
}