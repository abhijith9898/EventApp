export const addEvent = async (event) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getEvents = async () => {
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const updateEvent = async (event) => {
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };