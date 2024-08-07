import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { useClerk } from "@clerk/clerk-react";
const ChatList = () => {
	const { session } = useClerk();
	const { isPending, error, data } = useQuery({
		queryKey: ["userChats"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
				credentials: "include",
				headers: {
					Authorization: `Bearer ${session.token}`, // Ensure session.token or equivalent is used
				},
			}).then((res) => res.json()),
	});

	return (
		<div className="chatList">
			<div className="dashboard">
				<span className="title">DASHBOARD</span>
				<Link to="/dashboard">Create a new CHAT</Link>
				<Link to="/">Explore KS AI</Link>
				<Link to="/">Contact</Link>
			</div>
			<hr />
			<div className="recent">
				<span className="title">RECENT CHAT</span>
				<div className="list">
					{isPending
						? "Loading..."
						: error
						? "Something went wrong"
						: data?.map((chat) => (
								<Link key={chat._id} to={`/dashboard/chats/${chat._id}`}>
									- {chat.title}
								</Link>
						  ))}
				</div>
			</div>
			<hr />
			<div className="upgrade">
				<img src="/logo.png" alt="" />
				<div className="texts">
					<span>Enjoy</span>
					<span>KS AI</span>
				</div>
			</div>
		</div>
	);
};
export default ChatList;
