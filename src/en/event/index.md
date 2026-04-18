# Phira Events

Phira has successfully hosted several events. This page mainly explains how event-related mechanisms work under the current project structure.

## Basic Concepts

### Events

An event has a one-to-one correspondence with an event page. Event pages are designed using the UML language; see the [UML documentation](../uml/syntax/README) for details.

Each event has an `owner`, usually set to the organizer’s personal or group account. When an event is hidden, only server admins and its `owner` can see it.

Events have start and end times. Before the start time, the event is visible but not joinable. At the start time, the server sends an in-game message to all players that the event has begun. After the end time, players can no longer register.

Events can be locked. When locked, no one can register, but visibility is unchanged.

Joining an event creates a leaderboard. The ranking rules are configured separately, so events are usually kept locked.

### Chart Collections

Chart collections can be created independently and are not tightly coupled with events.

An event page can reference one or more chart collections. Charts in those collections are not restricted by fields such as `hidden` and are always visible to all players.

## Running an Event

To run an event, the organizer must provide the following materials to the current TeamFlos community administrator or the designated external contact (the "liaison"):

- Event schedule or planning outline
- UML source code for the event page
- Art assets used on the event page
- The chart collection(s) required by the event, along with the charts included in them

For art assets, self-hosting is recommended for server load and availability reasons. The source files provided to TeamFlos only need to include the relevant asset URLs.

If you have additional requirements beyond the above, please confirm them with the liaison in advance so feasibility can be assessed in time.
