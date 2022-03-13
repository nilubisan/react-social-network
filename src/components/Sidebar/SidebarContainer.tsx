import { connect } from 'react-redux';
import Sidebar from './Sidebar';

const mapStateToProps = (state: any) => ({
  users: state.common.users,
});

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer;
