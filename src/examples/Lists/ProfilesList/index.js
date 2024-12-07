import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import { fetchUsers } from "api/apiAdmin";
import { getRoomUserMessage, postRoom } from "api/apiChat";
import { jwtDecode } from "jwt-decode";
import { useChat } from "hook/ChatContext";

const getCurrentUserId = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }
  return null;
};

function ProfilesList({ title }) {
  const [profiles, setProfiles] = useState([]);
  const token = localStorage.getItem("token");
  const { openChat } = useChat();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchUsers(token);
        const users = response.data.users;

        const profilesWithRooms = await Promise.all(
          users.map(async (user) => {
            const roomResponse = await getRoomUserMessage(user.id);
            return { ...user, rooms: roomResponse.data.rooms || [] };
          })
        );

        setProfiles(profilesWithRooms);
      } catch (error) {
        console.error("Failed to fetch users or rooms", error);
      }
    };

    loadProfile();
  }, []);

  const checkExistingRoom = async (currentUser, otherUserId) => {
    try {
      const roomResponse = await getRoomUserMessage(currentUser);
      const existingRoom = roomResponse.data.find(
        (room) =>
          room.members.includes(String(currentUser)) && room.members.includes(String(otherUserId))
      );

      return existingRoom;
    } catch (error) {
      console.error("Error checking existing rooms:", error);
      return null;
    }
  };

  const handleCheckOrCreateRoom = async (otherUserId, otherUsername) => {
    const currentUser = getCurrentUserId();

    const existingRoom = await checkExistingRoom(currentUser, otherUserId);

    if (existingRoom) {
      openChat(existingRoom._id, otherUsername);
    } else {
      const newRoomData = {
        members: [currentUser, otherUserId],
        isGroup: false,
        name: `Chat with ${otherUsername}`,
      };
      try {
        const newRoomResponse = await postRoom(newRoomData);
        openChat(newRoomResponse.data._id, otherUsername);
      } catch (error) {
        console.error("Error creating new room:", error);
      }
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2}>
        <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {profiles.map((profile) => (
            <SoftBox
              key={profile.id}
              component="li"
              display="flex"
              alignItems="center"
              py={1}
              mb={1}
            >
              <SoftBox mr={2}>
                <SoftAvatar
                  src={`/images/${profile.username}.jpg`}
                  alt={profile.username}
                  variant="rounded"
                  shadow="md"
                />
              </SoftBox>
              <SoftBox
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
              >
                <SoftTypography variant="button" fontWeight="medium">
                  {`${profile.first_name} ${profile.last_name}`.trim()}
                </SoftTypography>
                <SoftTypography variant="caption" color="text">
                  {profile.email}
                </SoftTypography>
              </SoftBox>
              <SoftBox ml="auto">
                <SoftButton
                  onClick={() =>
                    handleCheckOrCreateRoom(
                      profile.id,
                      `${profile.first_name} ${profile.last_name}`
                    )
                  }
                  variant="text"
                  color="info"
                >
                  Chat
                </SoftButton>
              </SoftBox>
            </SoftBox>
          ))}
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ProfilesList;
