import Timeline from "./Timeline/Timeline";
import MainRightContent from "./MainRightContent";
import Header from "./Header";
import MobileOverlay from "../Mobile/MobileOverlay";

const Main = ({isLoading, socketNotification}) => {
	

	return (
		<div className="w-full md:w-4/5 z-10	">
			<MobileOverlay />
			<Header />
			<div className="flex mt-0 md:mt-32 relative">
				<Timeline postsLoading={isLoading} notification={socketNotification}/>
				<MainRightContent	/>
			</div>
		</div>
	);
};

export default Main;
