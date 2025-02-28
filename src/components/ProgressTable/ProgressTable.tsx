import { Fragment, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { MdSave } from "react-icons/md";
import { updateProgressStage } from "../../redux/features/progressStage/progressStageSlice";

const ProgressTable = () => {
  const progressData = useAppSelector((state) => state.progressStage);
  const [partNameText, setPartNameText] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleSaveProgressStage = (id: number | string) => {
    dispatch(updateProgressStage({ id, partName: partNameText }));
    setPartNameText("");
  };

  return (
    <div className="w-full mt-2 flex gap-2">
      <div className="w-1/4 border h-[310px] border-primary-400">
        <div className="bg-primary-400 px-2 py-3">
          <p className="text-primary-50 text-xl font-semibold">History</p>
        </div>
      </div>
      <div className="flex w-3/4 max-h-[310px] border-separate flex-col overflow-clip">
        <table className="w-full table-fixed text-primary-50 text-center">
          <thead className="sticky top-0 bg-primary-700">
            <tr>
              <th className="p-2 border">Progress Stage</th>
              <th className="p-2 w-1/6 border">
                Part Name <br /> Progress Description
              </th>
              <th className="p-2 border">Type</th>
              {[...Array(10)].map((_, i) => (
                <th key={i} className="p-2 border">
                  CT{i + 1}
                  <br />
                  (in sec)
                </th>
              ))}
              <th className="p-2 border">
                Avg CT <br />
                (in sec)
              </th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
        </table>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <table className="w-full table-fixed text-center text-primary-50 text-lg">
            <tbody>
              {progressData.map((stageData, index) => (
                <Fragment key={index}>
                  {stageData.cycleTimes.map((cycleTime, subIndex) => (
                    <tr key={subIndex}>
                      {subIndex === 0 && (
                        <>
                          <td className="border" rowSpan={2}>
                            {stageData.stage}
                          </td>
                          <td className="w-1/6 border" rowSpan={2}>
                            {stageData.partName}
                          </td>
                        </>
                      )}
                      <td className="border">{cycleTime.type}</td>
                      {Object.values(cycleTime.cycleTimeItems).map(
                        (value, i) => (
                          <td key={i} className="border">
                            {value}
                          </td>
                        )
                      )}
                      <td className="border">{cycleTime.avg}</td>
                      <td className="border">{cycleTime.avg}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressTable;
