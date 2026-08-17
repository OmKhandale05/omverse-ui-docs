'use client'
import { useState } from 'react'
import { TransferList, type TransferListOption } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import { AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection, ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable, RelatedComponents, StateMatrix } from '@/components/docs/ComponentDocumentation'
const PROPS=[{name:'options',type:'readonly TransferListOption[]',default:'required',description:'Complete governed option set.'},{name:'value',type:'readonly string[]',default:'undefined',description:'Controlled values in target list.'},{name:'defaultValue',type:'readonly string[]',default:'[]',description:'Initial target values.'},{name:'onValueChange',type:'(values: readonly string[]) => void',default:'undefined',description:'Runs when target values change.'},{name:'sourceTitle',type:'ReactNode',default:"'Available'",description:'Source heading.'},{name:'targetTitle',type:'ReactNode',default:"'Selected'",description:'Target heading.'},{name:'searchable',type:'boolean',default:'true',description:'Enables independent list search.'},{name:'filterOption',type:'(option, query) => boolean',default:'label match',description:'Custom option matching.'},{name:'disabled',type:'boolean',default:'false',description:'Disables selection and movement.'},{name:'loading',type:'boolean',default:'false',description:'Shows option resolution progress.'},{name:'emptyState',type:'ReactNode',default:"'No options'",description:'Empty-list content.'},{name:'variant',type:"'outlined' | 'filled' | 'raised'",default:"'outlined'",description:'Controls panel treatment.'},{name:'size',type:"'sm' | 'md' | 'lg'",default:"'md'",description:'Controls panel height and density.'},{name:'orientation',type:"'horizontal' | 'vertical'",default:"'horizontal'",description:'Controls panel arrangement.'}] as const
const BASIC=`import { TransferList } from 'omverse-ui'

<TransferList options={permissions} value={assigned} onValueChange={setAssigned}
  sourceTitle="Available permissions" targetTitle="Assigned permissions" />`
const VERTICAL=`<TransferList options={members} defaultValue={teamIds} orientation="vertical" size="sm" />`
const PERMISSIONS: TransferListOption[] = [
  { value: 'security', label: 'Security' },
  { value: 'billing', label: 'Billing' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'members', label: 'Members' },
]
const TEAM_MEMBERS: TransferListOption[] = [
  { value: 'maya-chen', label: 'Maya Chen' },
  { value: 'noah-williams', label: 'Noah Williams' },
  { value: 'priya-shah', label: 'Priya Shah' },
]
function TransferPreview() {
  const [value, setValue] = useState(['security'])
  return (
    <TransferList
      value={value}
      onValueChange={setValue}
      options={PERMISSIONS}
      searchable
      sourceTitle="Available permissions"
      targetTitle="Assigned permissions"
    />
  )
}
export default function TransferListPage(){return <div><PageHeader breadcrumb={['Components','Enterprise','TransferList']} title="TransferList" description="TransferList moves governed options between available and selected collections." tags={['Dual listbox','Multi-select','Search','Move selected/all','2 orientations']}/><ComponentDocumentation>
<ComponentDocSection id="overview" title="Overview" description="Use TransferList when people must build a reviewed target collection from a larger governed set and see both membership states simultaneously."><div className="component-doc-stack"><ComponentPreview title="Role permissions" description="Select available permissions, move them, then select assigned permissions to move back."><TransferPreview/></ComponentPreview><CodeBlock filename="PermissionAssignment.tsx" code={BASIC}/></div></ComponentDocSection>
<ComponentDocSection id="anatomy" title="Anatomy" description="TransferList combines named source and target panels, search, multi-selected options, and directional movement controls."><Anatomy preview={<div className="component-anatomy-visual transfer-anatomy"><section><header>Available <b>3</b></header><label>⌕ Search</label><p className="selected">✓ Analytics</p><p>□ Billing</p></section><nav><button>→</button><button>←</button></nav><section><header>Assigned <b>1</b></header><label>⌕ Search</label><p>□ Security</p></section><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{top:-34,left:42}}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{top:63,left:-34}}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{bottom:-34,left:48}}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{top:-34,left:133}}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{top:88,right:-20}}>5</span></div>} items={[{number:1,name:'Source panel',description:'Contains options not in the target collection.'},{number:2,name:'Search',description:'Filters one panel without changing membership.'},{number:3,name:'Option selection',description:'Stages enabled options for movement.'},{number:4,name:'Transfer controls',description:'Move selected or all visible enabled options.'},{number:5,name:'Target panel',description:'Shows the committed value collection.'}]}/></ComponentDocSection>
<ComponentDocSection id="when-to-use" title="When to use" description="Use for deliberate membership configuration where comparing available and selected sets prevents mistakes."><GuidanceList tone="do" items={[{title:'Assign governed permissions',description:'Build roles from a known permission catalog.'},{title:'Configure membership',description:'Move people, fields, or resources into a target set.'},{title:'Review both states',description:'Keep available and assigned membership simultaneously visible.'}]}/></ComponentDocSection>
<ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer simpler selection when the set is small, ordered dragging matters, or choices are temporary filters."><GuidanceList tone="dont" items={[{title:'Do not choose one value',description:'Use Select or Combobox.'},{title:'Do not apply temporary filters',description:'Use FilterBar or Checkbox.'},{title:'Do not manage ordering alone',description:'Use a reorderable list when every item is already selected.'}]}/></ComponentDocSection>
<ComponentDocSection id="variants" title="Variants" description="Panel treatment, size, and orientation adapt TransferList to full pages and narrow configuration surfaces."><BehaviorGrid items={[{icon:'ti-border-all',title:'Outlined',description:'Default defined dual panels.'},{icon:'ti-square-filled',title:'Filled',description:'Tonal panels on dense pages.'},{icon:'ti-shadow',title:'Raised',description:'Elevated configuration surface.'},{icon:'ti-layout-rows',title:'Orientation',description:'Horizontal or vertically stacked panels.'}]}/></ComponentDocSection>
<ComponentDocSection id="states" title="States" description="Option selection is temporary staging; only movement changes committed target values."><StateMatrix rows={[{state:'Available',trigger:'Value outside target',visual:'Source option',interaction:'Select for movement'},{state:'Assigned',trigger:'Value inside target',visual:'Target option',interaction:'Select for removal'},{state:'Selected',trigger:'Option staged',visual:'Primary row and check',interaction:'Transfer enabled'},{state:'Filtered',trigger:'Panel query entered',visual:'Matching options only',interaction:'Move all affects visible options'},{state:'Loading',trigger:'Options resolving',visual:'Panel status',interaction:'Movement disabled'},{state:'Disabled',trigger:'Option unavailable',visual:'Reduced emphasis',interaction:'Cannot stage or move'}]}/></ComponentDocSection>
<ComponentDocSection id="behavior" title="Behavior" description="TransferList owns staging, filtering, and movement while applications own retrieval, policy, persistence, and ordering."><BehaviorGrid items={[{icon:'ti-checkbox',title:'Staging',description:'Selecting an option does not move it.'},{icon:'ti-arrows-exchange',title:'Movement',description:'Controls commit selected or visible enabled values.'},{icon:'ti-search',title:'Independent search',description:'Each query filters only its panel.'},{icon:'ti-lock',title:'Governed options',description:'Disabled options remain visible but cannot move.'}]}/></ComponentDocSection>
<ComponentDocSection id="accessibility" title="Accessibility" description="Two named multi-select listboxes and explicitly labeled movement buttons expose every operation without drag-and-drop."><div className="component-doc-stack"><KeyboardTable rows={[{keys:['Tab'],action:'Moves among search, options, and transfer controls.'},{keys:['Enter','Space'],action:'Toggles the focused option or activates movement.'}]}/><AccessibilityChecklist items={['Give both panels distinct visible headings and listbox names.','Expose staged selection with aria-selected.','Name every directional control by source and destination.','Keep movement independent from visual direction in accessible labels.','State option counts and disabled availability in text.','Use vertical orientation when horizontal panels cannot remain usable.']}/></div></ComponentDocSection>
<ComponentDocSection id="content-guidelines" title="Content guidelines" description="Panel and option labels should make membership direction and consequences obvious."><ContentGuidelines rules={[{label:'Name membership states',guidance:'Use domain-specific panel headings.',example:'Available permissions, Assigned permissions'},{label:'Use parallel labels',guidance:'Name every option at the same level.',example:'Analytics, Billing, Security'},{label:'Add distinguishing context',guidance:'Use descriptions when labels may be ambiguous.',example:'Manage invoices and plans'},{label:'Name movement',guidance:'Accessible controls should include destination.',example:'Move selected to assigned'}]}/></ComponentDocSection>
<ComponentDocSection id="examples" title="Examples" description="Vertical orientation supports narrow panels while retaining the same source-target model."><div className="component-doc-stack"><ComponentPreview title="Vertical assignment"><TransferList
      options={TEAM_MEMBERS}
      defaultValue={['maya-chen']}
      sourceTitle="Available members"
      targetTitle="Team members"
      orientation="vertical"
      size="sm"
    /></ComponentPreview><CodeBlock filename="TeamAssignment.tsx" code={VERTICAL}/></div></ComponentDocSection>
<ComponentDocSection id="props-api" title="Props / API" description="TransferList extends div attributes; options define identity, label, description, and availability."><PropsTable props={PROPS}/></ComponentDocSection>
<ComponentDocSection id="related-components" title="Related components" description="Choose based on selection count, visibility needs, and whether membership is temporary or persisted."><RelatedComponents items={[{name:'Combobox',href:'/components/combobox',description:'Select searchable values compactly',icon:'ti-list-search'},{name:'Checkbox',href:'/components/checkbox',description:'Toggle a small visible set',icon:'ti-checkbox'},{name:'DataTable',href:'/components/data-table',description:'Review dense selectable records',icon:'ti-table'},{name:'FilterBar',href:'/components/filter-bar',description:'Apply temporary conditions',icon:'ti-filter'}]}/></ComponentDocSection>
</ComponentDocumentation></div>}
