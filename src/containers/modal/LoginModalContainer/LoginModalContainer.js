import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import * as baseActions from 'store/modules/base';
import LoginModal from 'components/modal/LoginModal';
import {apiServer} from 'config';



class LoginModalContainer extends Component{
   handleHideModal = ()=>{
      const {BaseActions} = this.props;
      BaseActions.hideModal('login');
   }
   handleLoginClick = ()=>{
      const serverUrl = `${apiServer}/api/auth/google`;
      window.open(serverUrl, 'loginWindow', 'width=500,height=600,left=50,top=50');
      window.addEventListener('message', (e)=>{
         if(e.data === 'login'){
            window.location.reload();
         }
      });
   }
	render(){
      const {visible} = this.props;
		return(
         <LoginModal 
            visible={visible}
            handleHideModal={this.handleHideModal}
            handleLoginClick={this.handleLoginClick}
         />
		)
	}
}

export default connect(
	state=>({
      visible: state.base.getIn(['modal','login']),
	}),
	dispatch=>({
		BaseActions: bindActionCreators(baseActions, dispatch)
	})
)(LoginModalContainer);

