import Timeline from "./Timeline/Timeline";
import MainRightContent from "./MainRightContent";
import Header from "./Header";
import MobileOverlay from "../Mobile/MobileOverlay";
import Notifications from "./notifications/Notifications";

const Main = ({ isLoading, newChunkLoading}) => {

  return (
    <div className="w-full md:w-4/5 z-10	">
			<Notifications />
      <MobileOverlay />
      <Header />
      <div className="flex mt-0 md:mt-32 relative">
        <Timeline postsLoading={isLoading} newChunkLoading={newChunkLoading} />
        <MainRightContent />
      </div>
    </div>
  );
};

export default Main;
