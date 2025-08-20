"use client";
import { useEffect, useMemo, useState } from "react";

import { useGetDropdownQuery } from "@/features/system/systemApiSlice";

type DataCaseChild = {
  id: string;
  name: string;
  description: string;
};
type DataCase = {
  group: string;
  items: DataCaseChild;
};
type ResDataCaseApi = DataCaseChild & {
  group: string;
};
const groupData = ({
  caseTypes,
  setGroup,
  setChildByGroup,
  setChildValue2text,
}) => {
  if (!caseTypes?.length) {
    setGroup([]);
    setChildByGroup({});
    return;
  }
  let valueChildByGroup = {
    null: [],
  };
  // let valueItems = [];
  let valueGroup = [];
  let valuechildValue2text = {};
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
    valuechildValue2text[id] = name;
    valueChildByGroup[group].push(child);
    valueChildByGroup["null"].push(child);
  }
  setGroup(valueGroup);
  setChildByGroup(valueChildByGroup);
  setChildValue2text && setChildValue2text(valuechildValue2text);
  return;
};
export default function useCaseType() {
  const { data } = useGetDropdownQuery();
  const caseTypes: ResDataCaseApi[] = useMemo(
    () => data?.data?.caseTypes || [],
    [data]
  );
  const [caseTypesFiltered, setCaseTypesFiltered] = useState<ResDataCaseApi[]>(
    []
  );
  //
  const [group, setGroup] = useState<string[]>([]);
  const [childByGroup, setChildByGroup] = useState({});
  const [groupFiltered, setGroupFiltered] = useState<string[]>([]);
  const [childByGroupFiltered, setChildByGroupFiltered] = useState({});
  //
  const [searchText, setSearchText] = useState<string>("");
  const [selectGroup, setSelectGroup] = useState<string>("null");
  const [childValue2text, setChildValue2text] = useState({});

  useEffect(() => {
    // if (!caseTypes?.length) {
    //   setGroup([]);
    //   setChildByGroup({});
    //   return;
    // }
    // let valueChildByGroup = {
    //   null: [],
    // };
    // // let valueItems = [];
    // let valueGroup = [];
    // let valuechildValue2text = {};
    // for (const { description, group, id, name } of caseTypes) {
    //   let child = {
    //     id,
    //     name,
    //     description,
    //   };
    //   if (valueChildByGroup?.[group] === undefined) {
    //     valueChildByGroup[group] = [];
    //     valueGroup.push(group);
    //   }
    //   valuechildValue2text[id] = name;
    //   valueChildByGroup[group].push(child);
    //   valueChildByGroup["null"].push(child);
    // }
    // setGroup(valueGroup);
    // setChildByGroup(valueChildByGroup);
    // setChildValue2text(valuechildValue2text);
    groupData({
      caseTypes,
      setGroup,
      setChildByGroup,
      setChildValue2text,
    });
  }, [caseTypes]);
  useEffect(() => {
    groupData({
      caseTypes: caseTypesFiltered,
      setGroup: setGroupFiltered,
      setChildByGroup: setChildByGroupFiltered,
      setChildValue2text: undefined,
    });
  }, [caseTypesFiltered]);

  useEffect(() => {
    if (!caseTypes?.length) {
      setCaseTypesFiltered([]);
      return;
    }
    const itemsFiltered = [...caseTypes].filter(
      (el) =>
        (!searchText ||
          el.group
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase()) ||
          el.name
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())) &&
        (selectGroup === "null" || selectGroup === el.group)
    );
    // itemsFiltered;
    setCaseTypesFiltered(itemsFiltered);
    console.log(searchText, selectGroup, caseTypes);
  }, [searchText, selectGroup, caseTypes]);

  return {
    state: { searchText, setSearchText, selectGroup, setSelectGroup },
    data: { group, childByGroup, childValue2text, items: [] },
    dataFiltered: {
      group: groupFiltered,
      childByGroup: childByGroupFiltered,
      items: [],
    },
  };
}
