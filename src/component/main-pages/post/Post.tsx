import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./Post.scss";
import { useComm } from "@hooks/useComm";
import { useUserData } from "@hooks/useUserData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera, faComment, faHeart, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { PostReactionType, PostType } from "types/Types";
import { useData } from "@hooks/useData";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
import { format } from "date-fns";
import { useInView } from "@hooks/useInView";
import { getCurrentEasternTimeDate } from "@component/service/format";
export const Post = () => {
  const [data, setData] = useState<PostType[] | null>(null);
  const [reactionData, setReactionData] = useState<PostReactionType[]>([]);
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const [addClick, setAddClick] = useState(false);
  const latestDate = data?.find((x) => x.UserId === selectedUser.Id)?.Date;
  const todaysDones = latestDate && isSameDateIgnoringTime(new Date(latestDate), getCurrentEasternTimeDate());
  useEffect(() => {
    refresh();
    refreshReaction();
  }, []);
  const refreshReaction = () => {
    api.post.getAllPostReactions({ Success: setReactionData });
  };
  const refresh = () => {
    setData(null);
    api.post.getAll({ Success: setData });
  };
  return (
    <div className="post">
      {addClick ? (
        <NewPost refresh={refresh} setAddClick={setAddClick} />
      ) : (
        <div>
          <div className="post-header">
            <img src={`/assets/${selectedUser.UserName.toString()}.jpg`} alt={selectedUser.toString()} />

            <div
              onClick={() => {
                if (!todaysDones) setAddClick(true);
              }}
              className={`new-post-button ${todaysDones && "done"}`}>
              {todaysDones ? "Today's post done!" : "Make today's post..."}
            </div>
          </div>
          {data ? (
            data.map((x) => (
              <PostContainer
                reactionData={reactionData.filter((y) => y.PostId === x.Id)}
                refreshReaction={refreshReaction}
                refresh={refresh}
                data={x}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
        </div>
      )}
    </div>
  );
};
function isSameDateIgnoringTime(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

const PostContainer = ({
  data,
  reactionData,
  refreshReaction,
  refresh
}: {
  data: PostType;
  reactionData: PostReactionType[];
  refreshReaction: () => void;
  refresh: () => void;
}) => {
  const { userList } = useData();
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const user = useRef(userList.find((x) => x.Id == data.UserId));
  const postLiked = reactionData.some((x) => x.UserId === selectedUser.Id);
  const [isInView, elementRef] = useInView<HTMLDivElement>();
  const [imageLoaded, setImageLoaded] = useState(false);

  const onLikeClick = () => {
    if (postLiked)
      api.post.removePostReaction({
        dto: { UserId: selectedUser.Id, PostId: data.Id, ReactionEmoji: "❤️" },
        Success: () => {
          refreshReaction();
        }
      });
    else {
      api.post.addPostReaction({
        dto: { UserId: selectedUser.Id, PostId: data.Id, ReactionEmoji: "❤️" },
        Success: () => {
          refreshReaction();
        }
      });
    }
  };
  useEffect(() => {}, []);
  const onTrashClick = () => {
    if (confirm("Are you sure you want to delete this post?")) api.post.delete({ dto: data, Success: refresh });
  };
  return (
    <div className={`post-container ${isInView && "visible"}`} ref={elementRef}>
      <hr></hr>
      {user.current?.Id === selectedUser.Id && (
        <div className="post-container-trash">
          <FontAwesomeIcon onClick={onTrashClick} icon={faTrash} />
        </div>
      )}
      <div className="post-container-header">
        <img src={`/assets/${user.current?.UserName.toString()}.jpg`} />
        <div>
          {user.current?.Name}
          <p>{timeAgo(new Date(data.Date))}</p>
        </div>
      </div>
      <div style={{ padding: "0.5em" }}>{data.Description}</div>
      <div className="image-upload-container">
        {isInView && (
          <img className="post-image" src={data.PictureUrl} loading="lazy" onLoad={() => setImageLoaded(true)} />
        )}
        {!imageLoaded && <LoadingSpinner />}

        <div className="like-indicator">
          {reactionData.length > 0 && (
            <>
              {reactionData.map((x) => (
                <img src={`/assets/${userList.find((y) => x.UserId === y.Id)?.UserName}.jpg`} />
              ))}
              <FontAwesomeIcon icon={faHeart} color="red" />
            </>
          )}
        </div>
      </div>
      <div className="post-button-container-display">
        <FontAwesomeIcon
          onClick={onLikeClick}
          style={{ transition: "color 1s ease-in-out" }}
          icon={faHeart}
          color={postLiked ? "red" : "black"}
        />
        <FontAwesomeIcon
          icon={faComment}
          onClick={() => {
            toast.info("Comments are disabled for all post until further notice!");
          }}
        />
      </div>
      <hr></hr>
    </div>
  );
};
function timeAgo(date: Date) {
  const now = getCurrentEasternTimeDate();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  console.log(diffInSeconds);
  // Check different time ranges and return the appropriate string
  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    // 30 days
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 31536000) {
    // 365 days
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}
const NewPost = ({ setAddClick, refresh }: { setAddClick: (val: boolean) => void; refresh: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescrition] = useState<string>("");
  const { selectedUser } = useUserData();
  const { api } = useComm();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height to auto to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on content
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    adjustTextareaHeight(); // Adjust height when component mounts or inputValue changes
  }, [description]);
  const handleUpload = async () => {
    if (description.length < 1 || !selectedImage) {
      toast.info("Please give a description and a picture before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedImage);
    setUploading(true);
    api.upload.upload({
      dto: formData,
      Success: (url: string) => {
        api.post.add({
          dto: {
            Id: -1,
            UserId: selectedUser.Id,
            Description: description,
            PictureUrl: url.replace(/['"]+/g, ""),
            Date: format(getCurrentEasternTimeDate(), "yyyy-MM-dd'T'HH:mm:ss")
          },
          Success: refresh
        });
      },
      Complete: () => {
        setUploading(false);

        setAddClick(false);
      },
      Notify: true
    });
  };

  return (
    <>
      <div style={{ padding: "0.5em" }}>
        <FontAwesomeIcon size="xl" onClick={() => setAddClick(false)} icon={faArrowLeft} />
      </div>
      <div className="post-container visible" style={{ padding: "0.5em" }}>
        <div className="post-container-header">
          <img src={`/assets/${selectedUser.UserName.toString()}.jpg`} alt={selectedUser.toString()} />
        </div>

        <textarea
          ref={textareaRef}
          onChange={(e) => {
            setDescrition(e.target.value);
          }}
          placeholder="Post description...."
        />
        <div className="image-upload-container">
          <div
            className="upload-area"
            style={{ backgroundImage: "none" }}
            onClick={() => document.getElementById("imageUpload")?.click()}>
            {!previewUrl ? (
              <>
                {" "}
                <FontAwesomeIcon icon={faCamera} className="camera-icon" />
                <FontAwesomeIcon icon={faUpload} className="camera-icon" />
              </>
            ) : (
              <img className={"post-image "} src={previewUrl} />
            )}
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>
        <div className="post-button-container">
          <Button disabled={uploading} onClick={handleUpload}>
            SUBMIT
          </Button>
        </div>
      </div>
    </>
  );
};
