/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * External dependencies
 */
import { css } from 'styled-components';

export const pill = css`
  border: 1px solid transparent;
  margin-right: 12px;
  padding: 7px 16px 8px;
  height: 36px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 20px;
  user-select: none;
  background-clip: padding-box;
`;

export const narrowPill = css`
  ${pill};
  padding: 5px 16px 6px;
  height: 32px;
  border-radius: 16px;
`;
