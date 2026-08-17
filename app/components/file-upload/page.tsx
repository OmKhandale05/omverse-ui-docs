'use client'

import { useState } from 'react'
import { FileUpload } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocSection,
  ComponentDocumentation,
  ContentGuidelines,
  GuidanceList,
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const PROPS = [
  { name: 'files', type: 'readonly File[]', default: 'undefined', description: 'Controlled accepted files.' },
  { name: 'defaultFiles', type: 'readonly File[]', default: '[]', description: 'Initial uncontrolled files.' },
  { name: 'onFilesChange', type: '(files) => void', default: 'undefined', description: 'Runs when accepted files change.' },
  { name: 'onReject', type: '(rejections) => void', default: 'undefined', description: 'Runs when files fail validation.' },
  { name: 'accept', type: 'string', default: 'undefined', description: 'Native MIME type or extension accept list.' },
  { name: 'maxSize', type: 'number', default: 'undefined', description: 'Maximum file size in bytes.' },
  { name: 'maxFiles', type: 'number', default: '1', description: 'Maximum accepted file count.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows more than one file.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables selection, dropping, and removal.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows upload processing state.' },
  { name: 'label', type: 'ReactNode', default: "'Drop files here or browse'", description: 'Primary drop-zone instruction.' },
  { name: 'description', type: 'ReactNode', default: 'undefined', description: 'Accepted format and limit guidance.' },
  { name: 'variant', type: "'outlined' | 'filled' | 'raised'", default: "'outlined'", description: 'Controls drop-zone treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls drop-zone and file-row scale.' },
] as const

const BASIC = `import { FileUpload } from 'omverse-ui'

<FileUpload
  multiple
  maxFiles={5}
  maxSize={10 * 1024 * 1024}
  accept=".pdf,.doc,.docx"
  description="PDF or Word, up to 10 MB each. Maximum 5 files."
  onFilesChange={setFiles}
  onReject={reportRejections}
/>`

const CONTROLLED = `<FileUpload
  files={evidence}
  onFilesChange={setEvidence}
  loading={mutation.isPending}
  required
  name="evidence"
/>`

const REJECTION_EXAMPLE = `<FileUpload
  maxSize={2 * 1024 * 1024}
  accept=".pdf"
  onReject={(rejections) => console.log(rejections)}
/>`

const DEMO_FILES: readonly File[] = [
  new File(['Security review notes'], 'security-review.pdf', { type: 'application/pdf' }),
]

function UploadPreview() {
  const [files, setFiles] = useState<readonly File[]>(DEMO_FILES)
  const [rejections, setRejections] = useState<string[]>([])

  return (
    <div className="component-doc-stack">
      <FileUpload
        files={files}
        onFilesChange={(value) => setFiles(value)}
        onReject={(items) => setRejections(items.map((item) => item.message))}
        multiple
        maxFiles={5}
        maxSize={10 * 1024 * 1024}
        accept=".pdf,.doc,.docx"
        description="PDF or Word documents, up to 10 MB each. Maximum 5 files."
      />
      {rejections.length > 0 && (
        <ul className="space-y-1 text-xs text-destructive">
          {rejections.map((item) => (
            <li key={item}>&bull; {item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

function UploadLoadingPreview() {
  const [files] = useState<readonly File[]>(DEMO_FILES)

  return (
    <FileUpload
      files={files}
      loading
      maxFiles={5}
      multiple
      description="Keep this page open until processing completes."
      onFilesChange={() => {}}
    />
  )
}

export default function FileUploadPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Enterprise', 'FileUpload']}
        title="FileUpload"
        description="FileUpload collects files through an accessible picker or drag-and-drop zone."
        tags={['Drag + drop', 'Validation', '3 variants', '3 sizes', 'Controlled files']}
      />
      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use FileUpload to collect one or more files when people need clear format, size, count, selection, and rejection feedback."
        >
          <div className="component-doc-stack">
            <ComponentPreview
              title="Security evidence"
              description="Use the picker to add files and confirm constraints before upload."
            >
              <UploadPreview />
            </ComponentPreview>
            <CodeBlock filename="EvidenceUpload.tsx" code={BASIC} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="FileUpload combines a picker and drop target with constraints, accepted file identity, metadata, and removal."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual file-upload-anatomy">
                <section>
                  <i>⇧</i>
                  <strong>Drop files here or browse</strong>
                  <small>PDF or Word, up to 10 MB.</small>
                </section>
                <footer>
                  <i>▤</i>
                  <span>
                    <b>security-review.pdf</b>
                    <small>2.4 MB</small>
                  </span>
                  <em>⌫</em>
                </footer>
                <span
                  className="component-anatomy-marker component-anatomy-marker--leader-down"
                  style={{ top: -34, left: 115 }}
                >
                  1
                </span>
                <span
                  className="component-anatomy-marker component-anatomy-marker--leader-right"
                  style={{ top: 75, left: -34 }}
                >
                  2
                </span>
                <span
                  className="component-anatomy-marker component-anatomy-marker--leader-left"
                  style={{ top: 98, right: -34 }}
                >
                  3
                </span>
                <span
                  className="component-anatomy-marker component-anatomy-marker--leader-up"
                  style={{ bottom: -34, left: 90 }}
                >
                  4
                </span>
                <span
                  className="component-anatomy-marker component-anatomy-marker--leader-up"
                  style={{ bottom: -34, right: 25 }}
                >
                  5
                </span>
              </div>
            }
            items={[
              { number: 1, name: 'Upload visual', description: 'Identifies file collection or current processing.' },
              { number: 2, name: 'Instruction', description: 'Names dropping and browsing as equivalent paths.' },
              { number: 3, name: 'Constraints', description: 'States accepted formats, size, and count before selection.' },
              { number: 4, name: 'Selected file', description: 'Shows file name and useful metadata.' },
              { number: 5, name: 'Remove control', description: 'Removes one file from the controlled collection.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use FileUpload when a workflow requires local files and people must review the selected collection before submission."
        >
          <GuidanceList
            tone="do"
            items={[
              {
                title: 'Collect evidence or attachments',
                description: 'Support documents, images, exports, and governed artifacts.',
              },
              {
                title: 'Validate before upload',
                description: 'Reject unsupported type, size, duplicates, and excess count immediately.',
              },
              {
                title: 'Show selected identity',
                description: 'Let people confirm and remove each file before submission.',
              },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Use another pattern when content already exists remotely or needs specialized capture and editing."
        >
          <GuidanceList
            tone="dont"
            items={[
              {
                title: 'Do not browse remote assets',
                description: 'Use a file picker or asset browser for existing repository content.',
              },
              {
                title: 'Do not capture camera media implicitly',
                description: 'Use a dedicated capture flow with permissions and preview.',
              },
              {
                title: 'Do not hide upload progress',
                description: 'Use Progress for long-running transfer and processing stages.',
              },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="variants"
          title="Variants"
          description="Drop-zone treatment and size adapt file collection to page-level tasks and compact form regions."
        >
          <BehaviorGrid
            items={[
              { icon: 'ti-border-style-2', title: 'Outlined', description: 'Dashed default drop target.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal drop zone for grouped forms.' },
              { icon: 'ti-shadow', title: 'Raised', description: 'Elevated collection surface.' },
              { icon: 'ti-arrows-maximize', title: 'Sizes', description: 'Small, medium, and large scale target and file rows.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="states"
          title="States"
          description="FileUpload separates selection, validation, and application-owned transfer progress."
        >
          <StateMatrix
            rows={[
              { state: 'Empty', trigger: 'No accepted files', visual: 'Instruction and constraints', interaction: 'Browse or drop' },
              { state: 'Drag active', trigger: 'Files enter target', visual: 'Primary border and ring', interaction: 'Drop to validate' },
              { state: 'Selected', trigger: 'Files pass validation', visual: 'Named removable rows', interaction: 'Add or remove' },
              { state: 'Rejected', trigger: 'Validation fails', visual: 'Assertive specific messages', interaction: 'Choose valid files' },
              { state: 'Loading', trigger: 'Upload or processing active', visual: 'Progress visual and label', interaction: 'Selection disabled' },
              { state: 'Disabled', trigger: 'Collection unavailable', visual: 'Reduced emphasis', interaction: 'Not operable' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="FileUpload owns local selection and validation while applications own transfer, persistence, virus scanning, retries, and server policy."
        >
          <BehaviorGrid
            items={[
              { icon: 'ti-file-plus', title: 'Collection', description: 'Picker and drop paths run the same validation pipeline.' },
              { icon: 'ti-shield-check', title: 'Validation', description: 'Type, size, count, and duplicate rules produce specific rejections.' },
              { icon: 'ti-trash', title: 'Removal', description: 'A named action removes one accepted file.' },
              {
                icon: 'ti-cloud-upload',
                title: 'Transfer boundary',
                description: 'Accepted files are returned; network upload remains application-owned.',
              },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="accessibility"
          title="Accessibility"
          description="The drop zone is a real button backed by a native file input; every operation remains available without drag-and-drop."
        >
          <div className="component-doc-stack">
            <KeyboardTable
              rows={[
                { keys: ['Tab'], action: 'Moves to the drop zone or a remove control.' },
                { keys: ['Enter', 'Space'], action: 'Opens the native file picker or removes the focused file.' },
              ]}
            />
            <AccessibilityChecklist
              items={[
                'Never require drag-and-drop; retain a keyboard-operable picker.',
                'State accepted types, maximum size, and maximum count before selection.',
                'Announce rejection messages with the file name and corrective constraint.',
                'Give every remove control a label containing the file name.',
                'Do not claim upload completion when files are only locally selected.',
                'Expose transfer progress separately for long uploads.',
              ]}
            />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Upload guidance should answer what, how many, and how large before people open the picker."
        >
          <ContentGuidelines
            rules={[
              { label: 'Name both paths', guidance: 'Treat browse and drop as equivalent.', example: 'Drop files here or browse' },
              { label: 'List formats', guidance: 'Use recognizable format names.', example: 'PDF or Word documents' },
              {
                label: 'State limits',
                guidance: 'Include per-file size and total count.',
                example: 'Up to 10 MB each. Maximum 5 files.',
              },
              { label: 'Write specific rejection', guidance: 'Name the file and failed rule.', example: 'report.exe is not an accepted file type.' },
            ]}
          />
        </ComponentDocSection>
        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Controlled files and loading state support application-owned submission and processing."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Processing state">
              <UploadLoadingPreview />
            </ComponentPreview>
            <CodeBlock filename="ControlledUpload.tsx" code={CONTROLLED} />
            <CodeBlock filename="ControlledValidation.tsx" code={REJECTION_EXAMPLE} />
          </div>
        </ComponentDocSection>
        <ComponentDocSection
          id="props-api"
          title="Props / API"
          description="FileUpload extends div attributes and exposes accepted files plus typed rejection codes."
        >
          <PropsTable props={PROPS} />
        </ComponentDocSection>
        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Use adjacent patterns for transfer progress, collection errors, or selecting existing records."
        >
          <RelatedComponents
            items={[
              { name: 'Progress', href: '/components/progress', description: 'Show transfer and processing progress', icon: 'ti-progress' },
              { name: 'Alert', href: '/components/alert', description: 'Explain form-level upload failures', icon: 'ti-alert-circle' },
              { name: 'Button', href: '/components/button', description: 'Submit accepted files', icon: 'ti-square-rounded' },
              { name: 'Combobox', href: '/components/combobox', description: 'Select an existing governed record', icon: 'ti-list-search' },
            ]}
          />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
