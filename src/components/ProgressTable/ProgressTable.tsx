import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCycleTimeId,
  setSelectedId,
  updateBtnSave,
} from "../../redux/features/progressStage/progressStageSlice";
import { setVideoSrc } from "../../redux/features/stageList/stageListSlice";
// import { MdSave } from "react-icons/md";
// import { updateProgressStage } from "../../redux/features/progressStage/progressStageSlice";

const ProgressTable = () => {
  const progressData = useAppSelector((state) => state.progressStage.stages);
  const activeId = useAppSelector((state) => state.stagelist.activeId);
  const dispatch = useAppDispatch();

  const [selectedCell, setSelectedCell] = useState<{
    rowId: number | string | null;
    colId: number | string | null;
  }>({
    rowId: null,
    colId: null,
  });

  useEffect(() => {
    dispatch(setSelectedId(selectedCell.rowId));
    dispatch(setCycleTimeId(selectedCell.colId));
  }, [selectedCell]);

  const handleSelectedCell = (
    rowId: number | string | null,
    colId: number | string | null
  ) => {
    setSelectedCell((prev) =>
      prev.rowId === rowId && prev.colId === colId
        ? { rowId: null, colId: null }
        : { rowId, colId }
    );
  };

  const handleClickSave = (id: number | string) => {
    dispatch(updateBtnSave({ id, activeId }));
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
                <th key={i} className={`p-2 border bg-[#666666]`}>
                  CT{i + 1}
                  <br />
                  (in sec)
                </th>
              ))}
              <th className="p-2 border bg-[#4e6996]">
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
              {progressData[activeId].progressStageData.map(
                (stageData, index) => (
                  <Fragment key={index}>
                    {stageData.cycleTimes.map((cycleTime, subIndex) => {
                      // const isSelectedRow = selectedRowId === stageData.id;
                      return (
                        <tr
                          key={subIndex}
                          // className={`cursor-pointer ${
                          //   isSelectedRow ? "bg-slate-800" : ""
                          // }`}
                          onClick={() => {
                            setSelectedCell({
                              rowId: stageData.id,
                              colId: null,
                            });
                            // console.log(stageData);
                            dispatch(
                              setVideoSrc({ videoSrc: stageData.videoSrc })
                            );
                          }}
                          className={`cursor-pointer`}
                        >
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
                              <td
                                key={i}
                                // className={`border`}
                                className={`border  ${
                                  selectedCell.rowId === stageData.id &&
                                  selectedCell.colId === i
                                    ? "bg-primary-800"
                                    : "bg-[#0b6e4a]"
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectedCell(stageData.id, i);
                                }}
                              >
                                {value}
                              </td>
                            )
                          )}
                          <td className="border bg-[#4e6996]">
                            {cycleTime.avg}
                          </td>
                          {subIndex === 0 && (
                            <td className="border p-1" rowSpan={2}>
                              <button
                                type="button"
                                className={`text-white ${
                                  stageData.statusBtn
                                    ? "bg-green-600 opacity-50 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                } font-medium rounded-md text-sm px-2 py-1`}
                                onClick={() => handleClickSave(stageData.id)}
                                disabled={stageData.statusBtn}
                              >
                                Save
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </Fragment>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgressTable;
