import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from 'store/modules/base';
import LoginModalContainer from 'containers/modal/LoginModalContainer';
import HeadContainer from 'containers/common/Head';

class Base extends Component{
   render(){
      return(
         <div>
            <LoginModalContainer />
            <HeadContainer />
         </div>
      )
   }
}

export default connect(
   null,
   (dispatch)=>({
      baseActions: bindActionCreators(baseActions, dispatch)
   })
)(Base);