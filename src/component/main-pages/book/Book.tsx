import {
  faCaretLeft,
  faInfoCircle,
  faPaperPlane,
  faPlusCircle,
  faTimes,
  faTrophy
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, ProgressBar } from "react-bootstrap";
import "./Book.scss";
import { BookType, BookDto, BookNote } from "types/Types";
import { LoadingSpinner } from "@component/assets/loading-indicator/LoadingSpinner";
import { useComm } from "@hooks/useComm";
import { format } from "date-fns";
import { useData } from "@hooks/useData";
import { useUserData } from "@hooks/useUserData";
import CustomTooltip from "@component/assets/custom-tooltip/CustomToolTip";
import { getCurrentEasternTimeDate } from "@component/service/format";

const fetchBookCover = async (title: string, author: string) => {
  const response = await fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}`);
  const data = await response.json();
  const book = data.docs?.[0];
  return book ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "No image found";
};

export const Book = () => {
  const [addClick, setAddClick] = useState(false);
  const [data, setData] = useState<BookDto[]>([]);
  const { api } = useComm();
  const [visible, setVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookDto | null>(null);
  const [notes, setNotes] = useState<BookNote[]>([]);
  useEffect(() => {
    refresh();
    setTimeout(() => {
      setVisible(true);
    }, 300);
  }, []);
  const refreshNote = () => {
    api.book.getAllBookNotes({
      Success: (data) => {
        setNotes(data);
      }
    });
  };
  const refresh = () => {
    api.book.getAllBooks({
      Success: (data) => {
        setData(data);
        setAddClick(false);
      }
    });
  };
  if (data == null) return <LoadingSpinner />;
  if (selectedBook)
    return (
      <div className="book">
        <BookNoteContainer
          refreshNote={refreshNote}
          bookNotes={notes.filter((x) => x.BookName === selectedBook.Book.Name)}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      </div>
    );
  return (
    <Container fluid className={`book transition-enter ${visible && "visible"}`}>
      <Row>
        <Col>
          <h2>
            BOOKS
            <div style={{ float: "right", opacity: 0.5 }}>
              <CustomTooltip
                tooltipText={
                  "You can add books to the list and set weekly goals. Others can join you in your reading journey!"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
              </CustomTooltip>
            </div>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            disabled={addClick}
            onClick={() => {
              setAddClick(true);
            }}
            className="input-add-button">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </Col>
      </Row>
      {data.map((x) => (
        <Row key={x.Book.Name}>
          <Col>
            <BookContainer data={x} refresh={refresh} setSelectedBook={setSelectedBook} />
          </Col>
        </Row>
      ))}
      {addClick && (
        <Row>
          <Col>
            <AddBookContainer refresh={refresh} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

const BookNoteContainer = ({
  refreshNote,
  bookNotes,
  setSelectedBook,
  selectedBook
}: {
  refreshNote: () => void;
  bookNotes: BookNote[];
  selectedBook: BookDto;
  setSelectedBook: React.Dispatch<React.SetStateAction<BookDto | null>>;
}) => {
  const { api } = useComm();
  const [addClick, setAddClick] = useState(false);
  const { selectedUser } = useUserData();
  const { userList } = useData();
  const [newNote, setNewNote] = useState<BookNote>({
    Id: -1,
    PageNumber: 0,
    UserId: selectedUser.Id,
    BookName: selectedBook.Book.Name,
    Description: ""
  });
  const submit = () => {
    api.book.addBookNote({
      dto: newNote,
      Success: () => {
        setAddClick(false);
        refreshNote();
        setNewNote({
          Id: -1,
          PageNumber: 0,
          UserId: selectedUser.Id,
          BookName: selectedBook.Book.Name,
          Description: ""
        });
      }
    });
  };
  return (
    <Container>
      <FontAwesomeIcon icon={faCaretLeft} onClick={() => setSelectedBook(null)} />
      <h4>Book notes for {selectedBook.Book.Name}</h4>
      {addClick ? (
        <Row>
          <Col>
            <label>Page number: </label>
            <input
              type="number"
              value={newNote.PageNumber}
              onChange={(e) => setNewNote({ ...newNote, PageNumber: parseInt(e.target.value) })}
              placeholder="page number..."
            />

            <textarea
              style={{ width: "100%", height: "20em" }}
              value={newNote.Description}
              onChange={(e) => setNewNote({ ...newNote, Description: e.target.value })}
            />
            <br></br>
            <button onClick={() => setAddClick(false)}>
              <FontAwesomeIcon icon={faTimes} />
              Cancel
            </button>
            <button onClick={submit}>
              <FontAwesomeIcon icon={faPaperPlane} />
              Submit
            </button>
          </Col>
        </Row>
      ) : (
        <Button
          disabled={addClick}
          onClick={() => {
            setAddClick(true);
          }}
          className="input-add-button">
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      )}
      {bookNotes.map((x) => (
        <div className="booknote-row">
          <div className="creator-buble">
            <img src={`/assets/${userList.find((y) => x.Id == y.Id)?.UserName}.jpg`} />
          </div>
          {x.Description}&nbsp;P.{x.PageNumber}
        </div>
      ))}
    </Container>
  );
};
const BookContainer = ({
  refresh,
  data,
  setSelectedBook
}: {
  refresh: () => void;
  data: BookDto;
  setSelectedBook: React.Dispatch<React.SetStateAction<BookDto | null>>;
}) => {
  const book = data.Book;
  const users = data.Users;

  const { userList } = useData();
  const { selectedUser } = useUserData();
  const currentWeek = data.Book.Started ? getCurrentWeek(data.Book.Started) + 1 : 0;
  const currentObjective = currentWeek * Math.floor(data.Book.PageQuantity / data.Book.NumberOfWeekObjective);
  const myUser = users.find((x) => selectedUser?.Id == x.UserId);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(myUser?.PageRead ?? 0);
  const { api } = useComm();
  const joinLecture = () => {
    if (selectedUser)
      api.book.updateBookUser({
        dto: { UserId: selectedUser.Id, BookName: book.Name, PageRead: 0 },
        Complete: refresh
      });
  };
  const startLecture = () => {
    if (selectedUser)
      api.book.updateBook({
        dto: { ...book, Started: format(getCurrentEasternTimeDate(), "yyyy-MM-dd") },
        Complete: refresh
      });
  };
  const updateUserPage = () => {
    if (selectedUser && myUser)
      api.book.updateBookUser({
        dto: { ...myUser, PageRead: pageCount },
        Complete: refresh
      });
  };
  useEffect(() => {
    fetchBookCover(book.Name, book.Author)
      .then((coverUrl) => setCoverUrl(coverUrl))
      .catch(() => setCoverUrl(null));
  }, []);
  return (
    <div className="book-container">
      <div className="creator-buble">
        {" "}
        <img src={`/assets/${book.CreatorName}.jpg`} />
      </div>
      <div className="book-container-row">
        <div className="book-container-img">
          {coverUrl ? <img src={coverUrl} alt="Book Cover" /> : coverUrl === "" && <LoadingSpinner />}
        </div>
        <div className="book-container-information">
          <h2>
            {book.Name} <br></br> {book.Author}
          </h2>
          <p>
            NB pages: {book.PageQuantity}
            <br />
            Objective: {Math.floor(book.PageQuantity / data.Book.NumberOfWeekObjective)} page/week
            <br />
            Current week since start: {currentWeek}
            <br></br>Current Target:{currentObjective} Page
          </p>
        </div>
      </div>
      <div className="book-container-row">
        <div className="progress-container">
          <div
            key={"goal"}
            className="user-marker"
            style={{ left: `${(currentObjective / book.PageQuantity) * 100}%` }}
            title={`Goal: ${currentObjective}`}>
            <span className="bubble">
              <FontAwesomeIcon icon={faTrophy} />
            </span>
          </div>
          {users.map((user, index) => (
            <div
              key={index}
              className="user-marker"
              style={{ left: `${(user.PageRead / book.PageQuantity) * 100}%` }}
              title={`${user.UserId}: ${user.PageRead}`}>
              <span className="bubble">
                <img src={`/assets/${userList.find((x) => x.Id === user.UserId)?.UserName}.jpg`} />
              </span>
            </div>
          ))}
          <ProgressBar now={(currentObjective / book.PageQuantity) * 100} />
        </div>
      </div>
      {book.Started ? (
        myUser ? (
          <div>
            <label>My page count:</label>
            <input
              type="number"
              value={pageCount}
              onBlur={updateUserPage}
              onChange={(e) => setPageCount(parseInt(e.target.value))}
            />
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <button
              onClick={() => {
                setSelectedBook(data);
              }}>
              Book notes
            </button>
          </div>
        ) : (
          <Button onClick={joinLecture}>JOIN LECTURE</Button>
        )
      ) : selectedUser?.Id == book.CreatorId ? (
        <Button onClick={startLecture}>START</Button>
      ) : (
        <div>Wait for the creator of this book post to start the lecture group!</div>
      )}
    </div>
  );
};
function getCurrentWeek(createDate: string): number {
  const msInAWeek = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week

  // Parse dates and ensure they are numbers by using .getTime()
  const startDate = new Date(createDate).getTime();
  const currentDate = getCurrentEasternTimeDate().getTime();

  // Calculate the difference in weeks
  const elapsedWeeks = Math.floor((currentDate - startDate) / msInAWeek);

  return elapsedWeeks;
}
const AddBookContainer = ({ refresh }: { refresh: () => void }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [submited, setSubmited] = useState(false);
  const { selectedUser } = useUserData();
  const ref = useRef<HTMLInputElement>(null);
  const { api } = useComm();
  const [data, setData] = useState<BookType>({
    Author: "",
    Name: "",
    Created: format(getCurrentEasternTimeDate(), "yyyy-MM-dd"),
    PageQuantity: 0,
    NumberOfWeekObjective: 0,
    Started: null,
    CreatorId: selectedUser?.Id ?? 0,
    CreatorName: selectedUser?.UserName ?? "0",
    Finished: false
  });
  const disabled =
    data.Author.length == 0 || data.Name.length == 0 || data.PageQuantity == 0 || data.NumberOfWeekObjective == 0;
  const submit = () => {
    if (selectedUser) {
      setSubmited(true);
      api.book.addBook({
        dto: data,
        Success: () => {
          api.book.updateBookUser({
            dto: { UserId: selectedUser.Id, BookName: data.Name, PageRead: 0 },
            Complete: refresh
          });
        },
        Complete: () => {
          setSubmited(false);
        }
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 200);
  }, []);
  const refreshBookCover = () => {
    if ((data.Author.length > 0, data.Name.length > 0)) {
      setCoverUrl("");
      fetchBookCover(data.Name, data.Author)
        .then((coverUrl) => setCoverUrl(coverUrl))
        .catch(() => setCoverUrl(null));
    }
  };
  return (
    <div className="book-container">
      <div className="book-container-row">
        <div className="book-container-img">
          {coverUrl ? <img src={coverUrl} alt="Book Cover" /> : coverUrl === "" && <LoadingSpinner />}
        </div>
        <div className="book-container-input">
          <input
            type="text"
            ref={ref}
            onBlur={refreshBookCover}
            onChange={(x) => setData({ ...data, Name: x.target.value })}
            placeholder="Book name"
          />
          <br />
          <input
            type="text"
            onBlur={refreshBookCover}
            onChange={(x) => setData({ ...data, Author: x.target.value })}
            placeholder="Author"
          />
          <br />
          <input
            type="number"
            onChange={(x) => setData({ ...data, PageQuantity: parseInt(x.target.value) })}
            placeholder="Page number"
          />
          <br />
          <input
            type="number"
            onChange={(x) => {
              setData({ ...data, NumberOfWeekObjective: parseInt(x.target.value) });
            }}
            placeholder="Target weeks to finish"
          />
          <br />
          <label>Start reading now? </label>
          &nbsp; &nbsp;&nbsp;&nbsp;
          <input
            type="checkbox"
            onChange={(x) => {
              const val = x.target.checked ? format(getCurrentEasternTimeDate(), "yyyy-MM-dd") : null;
              setData({ ...data, Started: val });
            }}
            placeholder="Week objective"
          />
        </div>
        <div className="book-container-button">
          <Button onClick={submit || submited} disabled={disabled} variant="success">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </div>
    </div>
  );
};
