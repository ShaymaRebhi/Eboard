import React from "react";
import { Scheduler, Editing, Resource } from "devextreme-react/scheduler";
import { resourcesData } from "../../utils/data";
import CustomStore from "devextreme/data/custom_store";
import notify from "devextreme/ui/notify";
import Appointment from "./Appointment";

import "whatwg-fetch";


function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}
const documentData = JSON.parse(localStorage.getItem("login"));
const schedulerDataSource = {
  store: new CustomStore({
    load: () => {
      return fetch("http://localhost:3000/scheduler/")
        .then(handleErrors)
        .then((response) => response.json());
    },
    insert: (values) => {
      console.log(values);
      const data = {
        text: values.text,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,
        sectionId: values.sectionId,
        allDay: values.allDay,
        postOwner: documentData.User._id,
      };
      return fetch("http://localhost:3000/scheduler/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((response) => response.json());
    },
    remove: (key) => {
      return fetch(`http://localhost:3000/scheduler/${key._id}`, {
        method: "DELETE",
      })
        .then(handleErrors)
        .then((response) => response.json());
    },
    update: (key, values) => {
      return fetch(`http://localhost:3000/scheduler/${key._id}`, {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(handleErrors)
        .then((response) => response.json());
    },
    paginate: false,
  }),
};
export default function CalendarComponent() {
  let allows ={ };
  if (documentData.role==="STUDENT") {
    allows ={
      allowAdding: false,
      allowDeleting: false,
      allowResizing: false,
      allowDragging: false,
      allowUpdating: false,
    }
  }
  else if (documentData.role==="TEACHER")
  {
    allows ={
      allowAdding: true,
      allowDeleting: true,
      allowResizing: true,
      allowDragging: true,
      allowUpdating: true,
    }
  }
 

  const showToast = (event, value, type) => {
    notify(`${event} "${value}" task`, type, 800);
  };

  const showAddedToast = (e) => {
    showToast("Added", e.appointmentData.result.text, "success");
  };

  const showUpdatedToast = (e) => {
    showToast("Updated", e.appointmentData.result.text, "info");
  };

  const views = ["day", "week", "month", "agenda"];
  return (
    <div>
      <Scheduler
        dataSource={schedulerDataSource}
        showAllDayPanel={true}
        views={views}
        editing={allows}
        defaultCurrentView="month"
        onAppointmentAdded={showAddedToast}
        onAppointmentUpdated={showUpdatedToast}
        appointmentComponent={Appointment}
      >
        <Resource
          fieldExpr="sectionId"
          allowMultiple={true}
          dataSource={resourcesData}
          label="Section"
          useColorAsDefault={true}
        />
      </Scheduler>
    </div>
  );
}

