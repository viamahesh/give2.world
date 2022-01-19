import React, { useContext, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { DisplayDate } from "../../../Shared";
import { RequestContext } from "../../../../providers";
import {
  QUERY_REQUESTS,
  deleteRequestMutation,
  setRequestCompleteStatusMutation,
} from "../../../../hooks";

import "./table.css";
import { Button } from "react-bootstrap";

interface RequestItemInterface {
  _id: string;
  requestTitle: string;
  requestDescription: string;
  neededDate: string;
  isFulfilled: boolean | string;
  comments: any;
  charity_ID: string;
  createdAt: string;
}

const Table = ({
  data,
  charityId,
}: {
  data: RequestItemInterface[];
  charityId: string | undefined;
}) => {
  const refetch = useContext(RequestContext) as any;
  const doDeleteRequest = deleteRequestMutation();
  const doSetRequestCompleteStatus = setRequestCompleteStatusMutation();
  const [showError, setShowError] = useState(false);

  const onHandleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm the action</h1>
            <p>
              Do you really want to delete this Request and all it's comments?
            </p>
            <button className="no-button" onClick={onClose}>
              No
            </button>
            <button
              onClick={async () => {
                try {
                  await doDeleteRequest({
                    variables: {
                      id,
                    },
                    refetchQueries: () => [
                      {
                        query: QUERY_REQUESTS,
                        variables: {
                          charityId,
                        },
                      },
                    ],
                  });
                  setShowError(false);
                  refetch();
                } catch (error) {
                  setShowError(true);
                }
                onClose();
              }}
              className="yes-button"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const onHandleCompleteStatus = async (
    id: string,
    completeStatus: boolean
  ) => {
    try {
      await doSetRequestCompleteStatus({
        variables: {
          id,
          isFulfilled: !completeStatus,
        },
        refetchQueries: () => [
          {
            query: QUERY_REQUESTS,
            variables: {
              charityId,
            },
          },
        ],
      });
      setShowError(false);
      refetch();
    } catch (error) {
      setShowError(true);
    }
  };

  if (data.length === 0) {
    return (
      <div className="no-data-text">
        <i className="fas fa-hourglass-start"></i>No requests available, please{" "}
        <Link
          to={"/request/add/" + charityId}
          className="highlight-text text-bold"
        >
          add your request.
        </Link>
      </div>
    );
  }

  return (
    <div className="request-list-container">
      <table className="data-table request-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Needed on or before</th>
            <th>Added on</th>
            <th>Completed</th>
            <th className="text-center">
              <Link to={"/request/add/" + charityId}>
                <span className="new-btn">
                  <i className="fas fa-plus"></i>Add a request
                </span>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: RequestItemInterface) => {
            return (
              <tr key={item._id}>
                <td>{item.requestTitle}</td>
                <td>{item.neededDate}</td>
                <td>
                  <DisplayDate dateString={item.createdAt} />
                </td>
                <td>{item.isFulfilled === "true" ? "Yes" : "No"}</td>
                <td>
                  <ul className="action-menu">
                    <li>
                      <a
                        onClick={() =>
                          onHandleCompleteStatus(
                            item._id,
                            item.isFulfilled === "true" ? true : false
                          )
                        }
                      >
                        {item.isFulfilled === "true" ? (
                          <>
                            <i className="far fa-check-square"></i>Mark as
                            incomplete
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check-square"></i>Mark as
                            complete
                          </>
                        )}
                      </a>
                    </li>
                    {item.comments.length > 0 && (
                      <li>
                        <Popup
                          trigger={
                            <a>
                              <i className="fas fa-comment-dots"></i>View
                              comments
                            </a>
                          }
                          modal
                        >
                          <div className="comment-data-container">
                            <p className="page-text">
                              <span className="page-title">Comments for:</span>{" "}
                              You are reading comments received for:{" "}
                              <span className="highlight-text text-bold">
                                {item.requestTitle}
                              </span>{" "}
                              request.
                            </p>
                            {item.comments.map((comment: any) => {
                              return (
                                <div className="individual-comment">
                                  <p><span className="highlight-text text-bold">Donor Name:</span> {comment.donorName}</p>
                                  <p><span className="highlight-text text-bold">Message:</span> {comment.message}</p>
                                  <p><span className="highlight-text text-bold">Date:</span> <DisplayDate dateString={comment.createdAt} /></p>
                                </div>
                              );
                            })}
                          </div>
                        </Popup>
                      </li>
                    )}
                    <li>
                      <a onClick={() => onHandleDelete(item._id)}>
                        <i className="fas fa-trash-alt"></i>Delete
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showError && (
        <span className="error-text">
          <i className="fas fa-exclamation-circle"></i>
          Operation failed. Please try again
        </span>
      )}
    </div>
  );
};

export default Table;
