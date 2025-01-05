export class EventManager {
    constructor() {
        this.events = this.loadEvents();
    }

    loadEvents() {
        const savedEvents = localStorage.getItem('timelineEvents');
        return savedEvents ? JSON.parse(savedEvents) : [];
    }

    saveEvents() {
        localStorage.setItem('timelineEvents', JSON.stringify(this.events));
    }

    submitEvent(event) {
        const newEvent = {
            ...event,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            type: 'user-submitted'
        };
        
        this.events.push(newEvent);
        this.saveEvents();
        return newEvent;
    }

    getEventsByDate(date) {
        return this.events.filter(event => event.date === date);
    }

    getAllEvents() {
        return this.events;
    }

    deleteEvent(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
        this.saveEvents();
    }

    updateEvent(eventId, updatedData) {
        this.events = this.events.map(event => {
            if (event.id === eventId) {
                return { ...event, ...updatedData };
            }
            return event;
        });
        this.saveEvents();
    }
} 