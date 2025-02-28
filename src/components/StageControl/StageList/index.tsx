import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchStageList } from "../../../redux/features/stagelist/stagelistSlice";
import {
  addProgressStage,
  ProgressStageState,
} from "../../../redux/features/progressStage/progressStageSlice";

const StageList = ({ setVideoUrl }: { setVideoUrl: (url: string) => void }) => {
  const [tabStageIndex, setTabStageIndex] = useState<number>(0);
  const tabStages = useAppSelector((state) => state.stagelist);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStageList(tabStages[tabStageIndex].name));
  }, [dispatch, tabStages[tabStageIndex].name]);

  const handleClickTabStage = (tabIndex: number) => {
    setTabStageIndex(tabIndex);
  };

  const handleClickTabItem = (name: string, url: string) => {
    const newProgressStage: ProgressStageState = {
      id: Date.now(),
      stage: name.split(". ")[0],
      partName: name.split(". ")[1],
      cycleTimes: [
        {
          type: "VA",
          cycleTimeItems: {
            CT1: 0,
            CT2: 0,
            CT3: 0,
            CT4: 0,
            CT5: 0,
            CT6: 0,
            CT7: 0,
            CT8: 0,
            CT9: 0,
            CT10: 0,
          },
          avg: 0,
        },
        {
          type: "NVA",
          cycleTimeItems: {
            CT1: 0,
            CT2: 0,
            CT3: 0,
            CT4: 0,
            CT5: 0,
            CT6: 0,
            CT7: 0,
            CT8: 0,
            CT9: 0,
            CT10: 0,
          },
          avg: 0,
        },
      ],
    };

    dispatch(addProgressStage({ newProgressStage }));

    setVideoUrl(url);
  };

  return (
    <div className="h-3/4 overflow-y-auto scrollbar-hide border border-primary-400">
      <div className="sticky top-0">
        <div className="bg-primary-400 px-2 py-3">
          <p className="text-primary-50 text-xl font-semibold">Stage List</p>
        </div>
        <div className="flex justify-evenly items-center bg-primary-500 py-3 gap-2">
          {tabStages.map((tabStage, tabIndex) => (
            <button
              className={`text-primary-50 px-3 py-2 text-base rounded-md font-semibold uppercase cursor-pointer ${
                tabIndex === tabStageIndex
                  ? "bg-primary-50 text-primary-600"
                  : ""
              }`}
              key={tabIndex}
              onClick={() => handleClickTabStage(tabIndex)}
            >
              {tabStage.name}
            </button>
          ))}
        </div>
      </div>
      <div className="p-2">
        <ul>
          {tabStages[tabStageIndex].items.map((item, index) => (
            <li
              className="p-2 hover:bg-primary-700 text-xl text-primary-50 flex justify-between items-center cursor-pointer"
              key={index}
              onClick={() => handleClickTabItem(item.name, item.url)}
            >
              <div>{item.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StageList;
