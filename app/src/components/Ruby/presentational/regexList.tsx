import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import {RegexListCommon} from "./regexListCommon";

export const RegexList: React.FC<{
  regexes: IRegex[],
  recommendRegexes: IRegex[],
  handleRegexEdit: (regexes: IRegex[], regexId: string | undefined) => void,
  handleLike: (regexes: IRegex[], regexId: string | undefined) => void,
  handleDisLike: (regexes: IRegex[], regexId: string | undefined) => void,
}> = ({regexes, recommendRegexes, handleRegexEdit, handleLike, handleDisLike}) => {
  return (
    <div className="block pt-8 pb-10">
      <label className="block text-xl font-bold text-gray-700">
        保存済みの正規表現一覧
      </label>
      <Tabs className="mt-2">
        <TabList>
          <Tab className="inline-block py-4 px-6 font-medium text-gray-600 hover:font-bold hover:text-sky-500 focus:outline-none">
            おすすめ
          </Tab>
          <Tab className="inline-block py-4 px-6 text-gray-600 hover:font-bold hover:text-sky-500 focus:outline-none">
            自分が保存
          </Tab>
        </TabList>

        <TabPanel>
          <RegexListCommon regexes={recommendRegexes} handleLike={handleLike} handleDisLike={handleDisLike} />
        </TabPanel>
        <TabPanel>
          <RegexListCommon regexes={regexes} handleRegexEdit={handleRegexEdit} handleLike={handleLike} handleDisLike={handleDisLike} isCanEdit={true} />
        </TabPanel>
      </Tabs>
    </div>
  )
}
