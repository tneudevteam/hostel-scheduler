/**
 * List of floors, rooms and beds for scheduler
 * @type {Object[]}
 */
module.exports = [
  {
    id: 'A',
    groupId: 'First floor',
    title: 'room 1',
    children: [
      {
        id: 'a1',
        title: 'bed 1'
      },
      {
        id: 'a2',
        title: 'bed 2'
      }
    ]
  },
  {
    id: 'B',
    groupId: 'First floor',
    title: 'room 2',
    children: [
      {
        id: 'b1',
        title: 'bed 1'
      },
      {
        id: 'b2',
        title: 'bed 2'
      }
    ]
  },
  {
    id: 'D',
    groupId: 'First floor',
    title: 'room 3',
    children: [
      {
        id: 'd1',
        title: 'bed 1'
      },
      {
        id: 'd2',
        title: 'bed 2'
      }
    ]
  },
  {
    id: 'E',
    groupId: 'Second floor',
    title: 'room 21',
    children: [
      {
        id: 'e1',
        title: 'bed 1'
      },
      {
        id: 'e2',
        title: 'bed 2'
      }
    ]
  },
  {
    id: 'C',
    groupId: 'Second floor',
    title: 'room 22',
    children: [
      {
        id: 'c1',
        title: 'bed 1'
      },
      {
        id: 'c2',
        title: 'bed 2'
      }
    ]
  }
];
