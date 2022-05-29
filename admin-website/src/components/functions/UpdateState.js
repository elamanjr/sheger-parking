import React from 'react';

export default function UpdateAddState(itemList, setItemList, newItem) {
  let tempList = [];
  itemList.map((item) => {
    tempList.push(item);
  });
  tempList.push(newItem);

  setItemList(tempList);
}

export function UpdateRemoveState(remId, itemList, setItemList) {
  let tempList = [];

  itemList.map((item) => {
    if (item.id != remId) {
      tempList.push(item);
    }
  });
  setItemList(tempList);
}

export function UpdateEditState(editId, itemList, setItemList, newItem) {
  let tempList = [];
  itemList.map((item) => {
    if (item.id == editId) {
      tempList.push(newItem);
    } else {
      tempList.push(item);
    }
  });
  setItemList(tempList);
}
