"use client";
import { useEffect, useMemo, useState } from "react";

import { useGetDropdownQuery } from "@/features/system/systemApiSlice";

type DataCaseChild = {
  id: string;
  name: string;
  description: string;
};
type ResDataCaseApi = DataCaseChild & {
  group: string;
};
interface GroupDataProps {
  caseTypes: ResDataCaseApi[];
  setGroup: (group: string[]) => void;
  setChildByGroup: (childByGroup: Record<string, DataCaseChild[]>) => void;
  setChildValue2text?: (childValue2text: Record<string, string>) => void;
}
const groupData = ({
  caseTypes,
  setGroup,
  setChildByGroup,
  setChildValue2text,
}: GroupDataProps) => {
  if (!caseTypes?.length) {
    setGroup([]);
    setChildByGroup({});
    return;
  }
  let valueChildByGroup: Record<string, DataCaseChild[]> = {
    null: [],
  };
  // let valueItems = [];
  let valueGroup = [];
  let valuechildValue2text: Record<string, string> = {};
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
  const [countFiltered, setCountFiltered] = useState<number>(0);
  const [group, setGroup] = useState<string[]>([]);
  const [childByGroup, setChildByGroup] = useState<
    Record<string, DataCaseChild[]>
  >({});
  const [groupFiltered, setGroupFiltered] = useState<string[]>([]);
  const [childByGroupFiltered, setChildByGroupFiltered] = useState<
    Record<string, DataCaseChild[]>
  >({});
  //
  const [searchText, setSearchText] = useState<string>("");
  const [selectGroup, setSelectGroup] = useState<string>("null");
  const [childValue2text, setChildValue2text] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
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
        !searchText ||
        el.group.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
        el.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setCaseTypesFiltered(itemsFiltered);
    setCountFiltered(itemsFiltered.length);
  }, [searchText, caseTypes]);

  const getByName = (name: string): string | undefined => {
    const item = caseTypes.find((item) => item.name === name);
    return item ? item.id : undefined;
  };

  return {
    state: { searchText, setSearchText, selectGroup, setSelectGroup },
    data: { group, childByGroup, childValue2text },
    dataFiltered: {
      group: groupFiltered,
      childByGroup: childByGroupFiltered,
      countFiltered,
    },
    functions: { getByName },
  };
}
