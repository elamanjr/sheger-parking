import Header from '../Header';
import SideNavBar from '../SideNavBar';
import '../../css/common.css';
import DisplayWindow from './DisplayWindow';
export default function Index() {
  
  return (
    <div>
      <Header />
      <div className="container-fluid row float-start ">
        <SideNavBar />
        <div class="container-fluid col-10 " id="displayWindow">
          <DisplayWindow />
        </div>
      </div>
    </div>
  );
}
