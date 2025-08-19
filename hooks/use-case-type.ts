"use client";
import { useEffect, useState } from "react";

import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
export default function useCaseType() {
  const { data } = useGetDropdownQuery();
  const [group, setGroup] = useState<string[]>([]);
  // const [items, setItems] = useState([]);
  const [childByGroup, setChildByGroup] = useState({});
  useEffect(() => {
    if (!data?.data) {
      setGroup([]);
      // setItems([]);
      setChildByGroup({});
      return;
    }
    let caseTypes = data?.data.caseTypes;

    let valueChildByGroup = {
      null: [],
    };
    // let valueItems = [];
    let valueGroup = [];
    for (const { description, group, id, name } of caseTypes) {
      let child = {
        id,
        name,
        description,
      };
      if (valueChildByGroup?.[group] === undefined) {
        valueChildByGroup[group] = [];
        valueGroup.push(group);
      }
      valueChildByGroup[group].push(child);
      valueChildByGroup["null"].push(child);
    }
    setGroup(valueGroup);
    setChildByGroup(valueChildByGroup);
  }, [data]);

  return {
    //  items,
    group,
    childByGroup,
  };
}
