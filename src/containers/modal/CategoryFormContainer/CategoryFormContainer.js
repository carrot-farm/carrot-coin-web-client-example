import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'; 
import InputModal from 'components/modal/InputModal';
import * as baseActions from 'store/modules/base';
import * as categoryActions from 'store/modules/category';

class CategoryFormContainer extends Component{
   handleHideModal = ()=>{
      const {BaseActions} = this.props;
      BaseActions.hideModal('categoryForm');
   }
   handleSubmitClick = async ()=>{
      const {
         BaseActions, 
         CategoryActions, 
         category,
         _id
      } = this.props;
      if(!category){
         return false;
      }
      if(_id){
         await CategoryActions.updateItem({_id:_id, category: category});
      }else{
         await CategoryActions.write({category: category});
         window.scrollTo(0, 0);
      }
      BaseActions.hideModal('categoryForm');
   }
   handleOnChange = (evt)=>{
      const {CategoryActions} = this.props;
      const {value} = evt.target;
      CategoryActions.changeInput(value);
   };
   handleKeyPress = (e)=>{
      if(e.key=== 'Enter'){
         e.preventDefault();
         return this.handleSubmitClick();
      }
   }
   handleOnEnter=(e)=>{
      this.setState({
         input: ''
      });
   }
	render(){
      const {visible, category} = this.props;
		return(
         <InputModal 
            visible={visible}
            title="카테고리"
            value={category}
            handleHideModal={this.handleHideModal}
            handleSubmitClick={this.handleSubmitClick}
            handleOnChange={this.handleOnChange}
            handleKeyPress={this.handleKeyPress}
            handleOnEnter={this.handleOnEnter}
         />
		)
	}
}
export default connect(
	state=>({
      visible: state.base.getIn(['modal','categoryForm']),
      category: state.category.get('category'),
      categories: state.category.get('categories'),
      page: state.category.get('page'),
      _id: state.category.get('_id'),
	}),
	dispatch=>({
      BaseActions: bindActionCreators(baseActions, dispatch),
      CategoryActions: bindActionCreators(categoryActions, dispatch),
	})
)(CategoryFormContainer);

